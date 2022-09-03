import InitApplication from "../../../../Logic/InitApplication";
import styles from "../../../../Styles/Components/Main/Scenes/IntroScene/_introScene.module.scss";
import { useEffect, useState } from "react";
import ChannelSide from "./ChannelSide/ChannelSide";
import { ChannelProps } from "../../../../interface";
import LoginSide from "./LoginSide/LoginSide";

// fetch가 완료되면 Suspense안에 컴포넌트들을 보여줌
// initialResource는 각 컴포넌트에서 필요로 하는 데이터들을 가지고 있어야 한다.
// initialResource는 Promise가 아님. Suspense를 위한 객체.
const initialResource = InitApplication();

const list: ChannelProps[] = [
  { name: "신이종", visitor: 15 },
  { name: "민경호", visitor: 44 },
  { name: "허강민", visitor: 300 },
  { name: "황여진", visitor: 400 },
  { name: "이소윤", visitor: 0 },
  { name: "김민기", visitor: 342 },
];

const IntroScene = (): JSX.Element => {
  // const [intro, setIntro] = useState(initialResource.intro.read());

  return (
    <div className={styles.intro_scene_container}>
      <ChannelSide list={list} />
      <LoginSide />
    </div>
  );
};

export default IntroScene;
