import { Fragment } from "react";
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

const Main = () => {
  return (
    <main className={styles.main_container}>
      {CONTENTS.map((content) => {
        const { key, component } = content;
        return (
          <Scene id={key} key={key}>
            {component}
          </Scene>
        );
      })}
    </main>
  );
};

export default Main;
