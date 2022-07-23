import { useState } from "react";
import { SCENE__GAMESCENE } from "../../../../constant";
import styles from "../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameScene__Gaming from "./GameScene__Gaming/GameScene__Gaming";
import GameScene__Waiting from './GameScene__Waiting/GameScene__Waiting';

const GameScene = (): JSX.Element => {

  const [isGaming, setIsGaming] = useState(true);

  const onTestBtnClicked = (): void => setIsGaming(prev => !prev);

  return (
    <div className={styles.game_scene_container}>
      <GameScene__Waiting _isGaming={isGaming}/>
      <GameScene__Gaming _isGaming={isGaming} />
    </div>
  );
};

export default GameScene;
