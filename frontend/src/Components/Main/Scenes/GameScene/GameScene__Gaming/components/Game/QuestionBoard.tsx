import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";

const QuestionBoard = () => {
  // 이부분은 방 설정에 따른 정해진 길이의 랜덤 단어가 처음에 주어질 것
  const round_suggestion = "소프트웨어공학";
  //
  const round_word = Array.from(round_suggestion);

  const create_round = round_word.map((_, i) => (
    <label key={i}>{round_word[i]}</label>
  ));

  const next_round = () => {
    
  }
  return (
    <div className={styles.questionboard}>
      <div className={styles.board_suggestion}>{create_round}</div>
      <div className={styles.board_question}>탕 수 육</div>
      <div>
        <input placeholder="여기에 입력해주세요" />
      </div>
    </div>
  );
};

export default QuestionBoard;