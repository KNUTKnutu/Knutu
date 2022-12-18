import styles from "./App.module.scss";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useSetRecoilState, useRecoilState } from "recoil";
import { User } from "./interface";
import { mountOpacity, roomsState, userState } from "./Recoil/atom";
import KnutuWebSocketHandler from "./Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";
import KnutuAudioHandler from "./Logic/Library/KnutuAudio/KnutuAudioHandler";
import { useEffect, useState } from "react";

const App = () => {
  KnutuAudioHandler.getInstance().setLoop();

  const setCurrentRoomsState = useSetRecoilState(roomsState);
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
    const { type } = json.header;

    switch(type) {
      case "currentRooms":
        setCurrentRoomsState(json.body);
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
