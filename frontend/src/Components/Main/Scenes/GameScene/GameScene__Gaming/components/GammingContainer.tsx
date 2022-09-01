import styles from "../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import GameBoard from "./GameBoard";
import InGameChat from "./InGameChat";

const GammingContainer = () => {
  return (
    <div className={styles.gamming_container}>
      <GameBoard />
      <InGameChat />
    </div>
  );
};

export default GammingContainer;
