import styles from "./App.module.scss";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useSetRecoilState, useRecoilState } from "recoil";
import { Nullable, User } from "./interface";
import { userState } from "./Recoil/atom";
import KnutuWebSocketHandler from "./Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";
import KnutuAudioHandler from "./Logic/Library/KnutuAudio/KnutuAudioHandler";
import { useEffect, useState } from "react";
import { mountOpacity } from "./Recoil/atom";

const App = () => {
  KnutuAudioHandler.getInstance().setLoop();

  const setUserState = useSetRecoilState<User>(userState);
  // mount 시 Scene에 opacity:0 부여
  const [opacity, setOpacity] = useRecoilState(mountOpacity);
  useEffect(()=>{
    const timeout = setTimeout(() => {
    setOpacity(true)
    }
    , 200);
     return () => clearTimeout(timeout);
  }, [])
  const messageListener = (msg: any) => {
    const type = JSON.parse(msg.data).header.type;

    switch (type) {
      case "onLobbyEntrance":
        setUserState(JSON.parse(JSON.parse(msg.data).payload.data));
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
