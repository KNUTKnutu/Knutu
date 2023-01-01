import styles from "./App.module.scss";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { enteredRoomIdState, enteredRoomState, mountOpacity, roomsState, userState } from "./Recoil/atom";
import KnutuWebSocketHandler from "./Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";
import { WebSocketPacket } from "./Logic/Library/KnutuWebSocket/KnutuWebSocketTypes";
import KnutuAudioHandler from "./Logic/Library/KnutuAudio/KnutuAudioHandler";
import { useEffect } from "react";

const App = () => {
  KnutuAudioHandler.getInstance().setLoop();

  const roomId = useRecoilValue(enteredRoomIdState);
  const user = useRecoilValue(userState);

  const setCurrentRoomsState = useSetRecoilState(roomsState);
  const setEnteredRoomState = useSetRecoilState(enteredRoomState);

  // mount 시 Scene에 opacity:0 부여
  const [opacity, setOpacity] = useRecoilState(mountOpacity);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);
  const messageListener = (msg: any) => {

    const json = JSON.parse(msg.data);
    const { body } = json;
    const { type } = json.header;

    console.log(json);

    const webSocketHandler: KnutuWebSocketHandler = KnutuWebSocketHandler.getInstance();

    switch(type) {
      case "currentRooms":
        setCurrentRoomsState(body);
        break;
      case "onGameWaitingEntrance":
        const packet: WebSocketPacket = {
          header: {
            type: "requestRoomInfo",
            date: new Date().getTime()
          },
          payload: {
            roomId
          }
        };
        webSocketHandler.send("requestRoomInfo", packet);
        break;
      case "requestRoomInfo":
        setEnteredRoomState(json.payload.data);
        webSocketHandler.send("submitSessionInfo", webSocketHandler.wrapPacket("submitSessionInfo", {
          userName: user?.name,
          roomId
        }));
        break;
      case "submitSessionInfo":
      case "requestExitRoom":
      case "requestToggleReady":
        setEnteredRoomState(json.payload.data);
        break;
    }
  };

  KnutuWebSocketHandler.onMessageReceiver = messageListener;

  return (
    <div className={styles.App}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
