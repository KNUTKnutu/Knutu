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

const App = () => {
  const setUserState = useSetRecoilState<Nullable<User>>(userState);

  const messageListener = (msg: any) => {
    const type = JSON.parse(msg.data).header.type;

    switch (type) {
      case "onLobbyEntrance":
        setUserState(JSON.parse(JSON.parse(msg.data).payload.data));
        console.log(userState);
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
