import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameWatingLeft from "./GameWatingLeft";
import GameWatingRight from "./GameWatingRight";

const GameScene__Waiting = ({ _isGaming }: any): JSX.Element => {
  return (
    <div
      className={`${styles.game_scene__waiting_container} ${
        _isGaming ? styles.true : styles.false
      }`}
    >
      <GameWatingLeft />
      <GameWatingRight />
    </div>
  );
};

export default GameScene__Waiting;
