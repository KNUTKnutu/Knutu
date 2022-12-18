import { useState } from "react";
import { SCENE__GAMESCENE } from "../../../../constant";
import KnutuAudioHandler from "../../../../Logic/Library/KnutuAudio/KnutuAudioHandler";
import styles from "../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameScene__Gaming from "./GameScene__Gaming/GameScene__Gaming";
import GameScene__Waiting from "./GameScene__Waiting/GameScene__Waiting";

const GameScene = (): JSX.Element => {
  const [isGaming, setIsGaming] = useState(false);

  const onTestBtnClicked = (): void => {
    // for test. 나중에 지워야 함 허강민 TODO
    setIsGaming((prev) => !prev);
    if(isGaming === true) {
      KnutuAudioHandler.getInstance().play(KnutuAudioHandler.clipGameSceneGaming);
    } else {
      KnutuAudioHandler.getInstance().play(KnutuAudioHandler.clipGameSceneWaiting);
    }
  }

  return (
    <div className={styles.game_scene_container}>
      <button className={styles.game_scene_for_test} onClick={onTestBtnClicked}>for testing</button>
      <GameScene__Waiting _isGaming={isGaming} />
      <GameScene__Gaming _isGaming={isGaming} />
    </div>
  );
};

export default GameScene;
