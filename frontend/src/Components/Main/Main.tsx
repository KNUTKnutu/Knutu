import React, { Fragment, useEffect } from "react";
import GameScene from "./Scenes/GameScene/GameScene";
import IntroScene from "./Scenes/IntroScene/IntroScene";
import LobbyScene from "./Scenes/LobbyScene/LobbyScene";
import styles from "../../styles/Components/Main/_main.module.scss";
import Scene from "../Reusable/Scene/Scene";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../../constant";
import FallAniPage from "../Reusable/Animation/FallAniPage";
import { currentSceneState } from './../../Recoil/atom';
import { useRecoilValue } from 'recoil';

const CONTENTS = [
  {
    key: SCENE__INTROSCENE,
    component: <IntroScene />,
  },
  {
    key: SCENE__LOBBYSCENE,
    component: <LobbyScene />,
  },
  {
    key: SCENE__GAMESCENE,
    component: <GameScene />,
  },
];

const Main = (): JSX.Element => {

  const sceneState = useRecoilValue(currentSceneState);
  const mainClasses = `${styles.main_container} ${sceneState === SCENE__GAMESCENE && styles.main_inGame}`;

  return (
    <main className={mainClasses}>
      {CONTENTS.map((content) => {
        const { key, component } = content;
        return (
          <Scene id={key} key={key}>
            {component}
          </Scene>
        );
      })}
      <FallAniPage />
    </main>
  );
};

export default Main;
