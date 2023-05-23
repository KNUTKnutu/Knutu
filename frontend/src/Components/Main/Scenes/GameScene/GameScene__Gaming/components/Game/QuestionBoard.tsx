import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { enteredRoomState, userState, isRoundInProgress } from "../../../../../../../Recoil/atom";
import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import KnutuWebSocketHandler from './../../../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';

let remainTimeTimeout = null;

const QuestionBoard = () => {

  const [boardInput, setBoardInput] = useState("");
  const [remainTurnTimeNumber, setRemainTurnTimeNumber] = useState(1200);
  const [remainRoundTimeNumber, setRemainRoundTimeNumber] = useState(60000);
  const room = useRecoilValue(enteredRoomState);
  const user = useRecoilValue(userState);
  const RoundInProgress = useRecoilValue(isRoundInProgress);

  const { currWord, currRound, roundWord, limitTime, remainRoundTime } = room;
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
    if(event.key === 'Enter' && RoundInProgress) {
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

  const timeoutCallback = () => {
    console.log(remainTurnTimeNumber);
    if (remainTimeTimeout === null || !RoundInProgress) return;
    if (remainTurnTimeNumber <= 0) {
      setRemainTurnTimeNumber(0);
      
      if (room.currTurn === user.name) {
        const payload = KnutuWebSocketHandler.getInstance().wrapPacket("onRoundEnd", {
          roomId: room.number,
          userName: user?.name
        });
        KnutuWebSocketHandler.getInstance().send("onRoundEnd", payload);
      }

      remainTimeTimeout = null;
      clearTimeout(remainTimeTimeout);
      return;
    }

    setRemainTurnTimeNumber((prev) => prev - 100);
    setRemainRoundTimeNumber((prev) => prev - 100);

    remainTimeTimeout = setTimeout(timeoutCallback, 100);
  }

  useEffect(() => {
    console.log(room);
  }, [room]);

  useEffect(() => {
    if(RoundInProgress) {
      setRemainTurnTimeNumber(remainRoundTime);
      setRemainRoundTimeNumber(limitTime * 1000);
      console.log(remainTurnTimeNumber);
      console.log(remainRoundTime);
      if(remainTimeTimeout === null) {
        console.log(room);
        remainTimeTimeout = setTimeout(timeoutCallback, 100);
      }
    } else {
      if(remainTimeTimeout !== null) {
        clearTimeout(remainTimeTimeout);
        remainTimeTimeout = null;
      }
    }
  }, [RoundInProgress]);

  return (
    <div className={styles.questionboard}>
      <div className={styles.board_suggestion}>{create_round}</div>
    <div className={styles.board_question}>{currWord ? currWord : roundWord[currRound - 1]}</div>
      <div className={styles.board_input_container}>
        <input className={styles.board_input} placeholder="여기에 입력해주세요" value={boardInput} onChange={onInputChange} onKeyPress={onKeyPress}/>
      </div>
      <div className={styles.timer}>
        <span>
          {(remainTurnTimeNumber / 1000).toFixed(1) + "초"}
        </span>
        <span>
          {(remainRoundTimeNumber / 1000).toFixed(1) + "초"}
        </span>
      </div>
    </div>
  );
};

export default QuestionBoard;
