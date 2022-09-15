import styles from "../../../../../styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import GameBoard from "./components/Game/GameBoard";
import InGameChat from "./components/Chat/InGameChat";

const GameGammingRight = () => {
  return (
    <div className={styles.gamming_container}>
      <GameBoard />
      <InGameChat />
    </div>
  );
};

export default GameGammingRight;
