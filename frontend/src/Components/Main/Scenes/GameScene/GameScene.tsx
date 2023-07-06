import { useState } from "react";
import { useRecoilValue } from "recoil";
import KnutuAudioHandler from "../../../../Logic/Library/KnutuAudio/KnutuAudioHandler";
import { isGameInProgress } from "../../../../Recoil/atom";
import styles from "../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameScene__Gaming from "./GameScene__Gaming/GameScene__Gaming";
import GameScene__Waiting from "./GameScene__Waiting/GameScene__Waiting";

const GameScene = (): JSX.Element => {
  // const [isGaming, setIsGaming] = useState(false);
  const isGaming = useRecoilValue(isGameInProgress);

  return (
    <div className={styles.game_scene_container}>
      <GameScene__Waiting _isGaming={isGaming} />
      <GameScene__Gaming _isGaming={isGaming} />
    </div>
  );
};

export default GameScene;
