import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SCENE__GAMESCENE } from "../../../../../constant";
import { currentSceneState } from "../../../../../Recoil/atom";
import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameGammingLeft from "./GameGammingLeft";
import GameGammingRight from "./GameGammingRight";

const GameScene__Gaming = ({ _isGaming }: any): JSX.Element => {

  const currentScene = useRecoilValue(currentSceneState);

  useEffect(() => {
    if(currentScene == SCENE__GAMESCENE)
    {
      /* 뭔가 여기서 작업이 이루어질만한 게 있을 것 같아서 만들었는데, 필요 없을 수도 있음. */
    }
  }, [currentScene]);

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
