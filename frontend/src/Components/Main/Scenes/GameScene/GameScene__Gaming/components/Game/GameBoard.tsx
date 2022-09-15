import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import QuestionBoard from "./QuestionBoard";
import Timer from "./Timer";

const GameBoard = () => {
  return (
    <div className={styles.gameboard_container}>
      <QuestionBoard />
      <Timer />
    </div>
  )
}

export default GameBoard