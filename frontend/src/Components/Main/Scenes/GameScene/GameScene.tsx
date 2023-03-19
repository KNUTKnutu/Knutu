import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SCENE__GAMESCENE } from "../../../../constant";
import { SCENESTATE } from "../../../../enum";
import KnutuAudioHandler from "../../../../Logic/Library/KnutuAudio/KnutuAudioHandler";
import { currentSceneState, isGameInProgress } from "../../../../Recoil/atom";
import styles from "../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameScene__Gaming from "./GameScene__Gaming/GameScene__Gaming";
import GameScene__Waiting from "./GameScene__Waiting/GameScene__Waiting";

const GameScene = (): JSX.Element => {
  const isGaming = useRecoilValue(isGameInProgress);
  const currentScene = useRecoilValue(currentSceneState);

  useEffect(() => {
    if(currentScene == SCENE__GAMESCENE) {
      KnutuAudioHandler.audio.play(isGaming ? KnutuAudioHandler.clipGameSceneGaming : KnutuAudioHandler.clipGameSceneWaiting);
    }
  }, [currentScene, isGaming]);

  return (
    <div className={styles.game_scene_container}>
      <GameScene__Waiting _isGaming={isGaming} />
      <GameScene__Gaming _isGaming={isGaming} />
    </div>
  );
};

export default GameScene;
