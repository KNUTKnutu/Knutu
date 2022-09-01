import styles from "../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import GameLog from "./GameLog";
import QuestionBoard from "./QuestionBoard";
import Timer from "./Timer";

const GameBoard = () => {
  return (
    <div className={styles.gameboard_container}>
      <QuestionBoard />
      <Timer />
      <input placeholder="여기에 입력해주세요" />
      <GameLog />
    </div>
  )
}

export default GameBoard