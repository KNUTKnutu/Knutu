import styles from "./App.module.scss";
import Splash from "./Components/Suspense/Splash";
import { Suspense } from "react";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useSetRecoilState } from "recoil";
import { Nullable, User } from "./interface";
import { userState } from "./Recoil/atom";
import KnutuWebSocketHandler from "./Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";
import KnutuAudioHandler from "./Logic/Library/KnutuAudio/KnutuAudioHandler";

const App = () => {
  // 민경호 TODO: 처음 IntroScene이 load될 때 기본으로 아래 한 줄이 호출되어 노래가 나올 수 있게.
  // KnutuAudioHandler.getInstance().play(KnutuAudioHandler.clipIntroScene);
  KnutuAudioHandler.getInstance().setLoop();

  const setUserState = useSetRecoilState<User>(userState);

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
      <Suspense fallback={<Splash />}>
        <Header />
        <Main />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
