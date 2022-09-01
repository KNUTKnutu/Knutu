import { useState } from "react";
import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GamerList from "./components/GamerList";
import GammingContainer from "./components/GammingContainer";

const GameScene__Gaming = ({ _isGaming }: any): JSX.Element => {
  return (
    <div
      className={`${styles.game_scene__gaming_container} ${
        _isGaming ? styles.true : styles.false
      }`}
    >
      <GamerList />
      <GammingContainer />
    </div>
  );
};

export default GameScene__Gaming;
