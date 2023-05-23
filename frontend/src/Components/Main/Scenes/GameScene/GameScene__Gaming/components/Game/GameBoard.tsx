import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import QuestionBoard from "./QuestionBoard";

const GameBoard = () => {
  return (
    <div className={styles.gameboard_container}>
      <QuestionBoard />
    </div>
  )
}

export default GameBoard