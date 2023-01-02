import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import QuestionBoard from "./QuestionBoard";
import Timer from "./Timer";

const GameBoard = () => {
  return (
    // TODO. 하단 클래스 적용 안 되는 버그
    <div className={styles.gameboard_container}>
      <QuestionBoard />
      <Timer />
    </div>
  )
}

export default GameBoard