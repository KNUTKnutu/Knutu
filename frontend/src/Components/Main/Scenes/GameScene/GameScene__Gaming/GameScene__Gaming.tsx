import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SCENE__GAMESCENE } from "../../../../../constant";
import { currentSceneState, enteredRoomState, wordState } from "../../../../../Recoil/atom";
import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameGammingLeft from "./GameGammingLeft";
import GameGammingRight from "./GameGammingRight";

const GameScene__Gaming = ({ _isGaming }: any): JSX.Element => {

  const currentScene = useRecoilValue(currentSceneState);
  const roomValue = useRecoilValue(enteredRoomState);
  const [_wordState, setWordState] = useRecoilState(wordState);

  useEffect(() => {
    if(currentScene == SCENE__GAMESCENE)
    {
      if(_isGaming) {
        setWordState(roomValue.currWord);
      }
    }
  }, [currentScene, _isGaming]);

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
