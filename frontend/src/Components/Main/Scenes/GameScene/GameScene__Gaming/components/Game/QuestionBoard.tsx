import { useState } from "react";
import { useRecoilValue } from "recoil";
import { enteredRoomState } from "../../../../../../../Recoil/atom";
import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";

const QuestionBoard = () => {

  const [boardInput, setBoardInput] = useState("");
  const room = useRecoilValue(enteredRoomState);

  // 이부분은 방 설정에 따른 정해진 길이의 랜덤 단어가 처음에 주어질 것
  const {roundWord: round_suggestion, startWord} = room;
  const round_word = Array.from(round_suggestion);

  const create_round = round_word.map((_, i) => (
    <span key={i}>{round_word[i]}</span>
  ));

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBoardInput(e.target.value);
    if(boardInput.length >= 17) setBoardInput(boardInput.substring(0, 17));
  }

  return (
    <div className={styles.questionboard}>
      <div className={styles.board_suggestion}>{create_round}</div>
      <div className={styles.board_question}>{startWord}</div>
      <div className={styles.board_input_container}>
        <input className={styles.board_input} placeholder="여기에 입력해주세요" value={boardInput} onChange={onInputChange} />
      </div>
    </div>
  );
};

export default QuestionBoard;
