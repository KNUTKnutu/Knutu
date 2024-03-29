import InitApplication from "../../../../Logic/InitApplication";
import styles from "../../../../Styles/Components/Main/Scenes/IntroScene/_introScene.module.scss";
import { useState } from "react";
import ChannelSide from "./ChannelSide/ChannelSide";
import LoginSide from "./LoginSide/LoginSide";
import KnutuCommonLib from "../../../../Logic/Library/KnutuCommonLib/KnutuCommonLib";

// fetch가 완료되면 Suspense안에 컴포넌트들을 보여줌
// initialResource는 각 컴포넌트에서 필요로 하는 데이터들을 가지고 있어야 한다.
// initialResource는 Promise가 아님. Suspense를 위한 객체.
const initialResource = InitApplication();

const IntroScene = (): JSX.Element => {
  const [intro, setIntro] = useState(initialResource.intro.read());
  KnutuCommonLib.getInstance().wakeUp();

  return (
    <div className={styles.intro_scene_container}>
      <ChannelSide />
      <LoginSide />
    </div>
  );
};

export default IntroScene;
