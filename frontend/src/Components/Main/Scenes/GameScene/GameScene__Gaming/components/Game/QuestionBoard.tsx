import { useState } from "react";
import { useRecoilValue } from "recoil";
import { enteredRoomState, userState } from "../../../../../../../Recoil/atom";
import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import KnutuWebSocketHandler from './../../../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';

const QuestionBoard = () => {

  const [boardInput, setBoardInput] = useState("");
  const room = useRecoilValue(enteredRoomState);
  const user = useRecoilValue(userState);

  const { currWord, currRound, roundWord } = room;
  const round_suggestion = roundWord;
  const round_word = Array.from(round_suggestion);

  const create_round = round_word.map((_, i) => (
    <span key={i}>{round_word[i]}</span>
  ));

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBoardInput(e.target.value);
    if(boardInput.length >= 17) setBoardInput(boardInput.substring(0, 17));
  }

  const onKeyPress = (e: React.KeyPressEvent<HTMLInputElement>): void => {
    console.log(e);
    if(event.key === 'Enter') {
      console.log(room);
      console.log(user);
      if(room.currTurn === user.name) {
        const payload = KnutuWebSocketHandler.getInstance().wrapPacket("wordSubmit", {
          roomId: room.number,
          userName: user?.name,
          word: boardInput
        });
        KnutuWebSocketHandler.getInstance().send("wordSubmit", payload);
      }
    }
  }

  const isReadonly = (): boolean => room?.currTurn !== user?.name;

  return (
    <div className={styles.questionboard}>
      <div className={styles.board_suggestion}>{create_round}</div>
    <div className={styles.board_question}>{currWord ? currWord : roundWord[currRound - 1]}</div>
      <div className={styles.board_input_container}>
        <input className={styles.board_input} placeholder="여기에 입력해주세요" value={boardInput} onChange={onInputChange} onKeyPress={onKeyPress} readOnly={isReadonly()}/>
      </div>
    </div>
  );
};

export default QuestionBoard;
