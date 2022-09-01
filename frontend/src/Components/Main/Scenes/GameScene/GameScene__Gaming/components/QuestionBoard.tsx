import styles from "../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";

const QuestionBoard = () => {
  return (
    <div className={styles.questionboard}>
      <div className={styles.board_suggestion}>
        <div>소 프 트 웨 어 공 학</div>
      </div>
      <div className={styles.board_question}>
        탕 수 육
      </div>
    </div>
  );
};

export default QuestionBoard;
