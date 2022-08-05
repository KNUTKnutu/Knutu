import { useState } from "react";
import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";

const GameScene__Gaming = ({ _isGaming }: any): JSX.Element => {
  return (
    <div
      className={`${styles.game_scene__gaming_container} ${
        _isGaming ? styles.true : styles.false
      }`}
    >
      <div>userlist</div> 

      <div>
        <div>gameboard</div>
        <div>IngameChat</div>
      </div>
    </div>
  );
};

export default GameScene__Gaming;
