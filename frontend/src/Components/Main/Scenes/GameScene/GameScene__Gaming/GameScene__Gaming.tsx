import { useState } from "react";
import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameGammingLeft from "./GameGammingLeft";
import GameGammingRight from "./GameGammingRight";

const GameScene__Gaming = ({ _isGaming }: any): JSX.Element => {
  return (
    <div
      className={`${styles.game_scene__gaming_container} ${
        _isGaming ? styles.true : styles.false
      }`}
    >
      <GameGammingLeft />
      <GameGammingRight />
    </div>
  );
};

export default GameScene__Gaming;
