import { SCENE__GAMESCENE } from "../../../../constant";
import styles from "../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";

const GameScene = (): JSX.Element => {
  return <div className={styles.game_scene_container}>{SCENE__GAMESCENE}</div>;
};

export default GameScene;
