import { useState } from "react";
import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";

const GameScene__Gaming = ({_isGaming}: any): JSX.Element => {

    return (
        <div className={`${styles.game_scene__gaming_container} ${_isGaming}`}>
            GameScene Gaming
        </div>
    )
};

export default GameScene__Gaming;