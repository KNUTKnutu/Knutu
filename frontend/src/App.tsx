import styles from "./App.module.scss";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { enteredRoomIdState, enteredRoomState, isGameInProgress, mountOpacity, roomsState, usersState, userState } from "./Recoil/atom";
import KnutuWebSocketHandler from "./Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";
import { WebSocketPacket } from "./Logic/Library/KnutuWebSocket/KnutuWebSocketTypes";
import KnutuAudioHandler from "./Logic/Library/KnutuAudio/KnutuAudioHandler";
import { useEffect } from "react";

const App = () => {
  KnutuAudioHandler.getInstance().setLoop();

  const roomId = useRecoilValue(enteredRoomIdState);
  const [user, setUser] = useRecoilState(userState);
  const [enteredRoom, setEnteredRoom] = useRecoilState(enteredRoomState);

  const setCurrentRoomsState = useSetRecoilState(roomsState);
  const setUsersState = useSetRecoilState(usersState);
  const setIsGameInProgress = useSetRecoilState(isGameInProgress);

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
    const { payload } = json;
    const { type } = json.header;

    console.log(json);

    const webSocketHandler: KnutuWebSocketHandler = KnutuWebSocketHandler.getInstance();

    // TODO. switch문 따로 함수 구비 필요. 너무 굵어져 유지보수 힘듦
    switch(type) {
      case "currentRooms":
        setCurrentRoomsState(payload);
        webSocketHandler.send("onLobbyEntrance", webSocketHandler.wrapPacket("onLobbyEntrance", {
          user
        }));
        break;
      case "onLobbyEntrance":
        // TODO. 로비에 들어가면서 이미 로그인 된 유저인지 한 번 더 체크하는 로직 필요.
        setUser(json.payload.data);
        break;
      case "currentChannelInfo":
        const users = Object.values(payload.onlineUsers);
        const sortedUsers: any = users.sort((a: any, b: any) => {
          return b.level - a.level;
        });
        setUsersState(sortedUsers);
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
        setEnteredRoom(json.payload.data);
        webSocketHandler.send("submitSessionInfo", webSocketHandler.wrapPacket("submitSessionInfo", {
          userName: user?.name,
          roomId
        }));
        break;
      case "submitSessionInfo":
      case "requestExitRoom":
      case "requestToggleReady":
        setEnteredRoom(json.payload.data);
        break;
      case "allPlayerReady":
        setIsGameInProgress(true);
        const {payload: {data: {roundWord}}} = json;
        setEnteredRoom({
          ...enteredRoom,
          roundWord,
          currWord: roundWord
        });
        webSocketHandler.send("requestGameState", webSocketHandler.wrapPacket("requestGameState", {
          roomId
        }));
        setTimeout(() => {
          webSocketHandler.send("requestRoundStart", webSocketHandler.wrapPacket("requestRoundStart", {
            userName: user?.name,
            roomId
          }));
        }, 3500);
        break;
      case "requestGameState":
        setEnteredRoom(json.payload.data);
        KnutuAudioHandler.audio.playOneShot(KnutuAudioHandler.clipGameStart);
        break;
      case "onRoundStart":
        KnutuAudioHandler.audio.play(KnutuAudioHandler.clipGameSceneGaming);
        KnutuAudioHandler.audio.setPlaybackRate(1); // 추후, 턴 남은 시간과 라운드 남은 시간을 적절히 조합하여, Playback Rate를 조절하여 긴장감을 증폭시켜야 함.
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
