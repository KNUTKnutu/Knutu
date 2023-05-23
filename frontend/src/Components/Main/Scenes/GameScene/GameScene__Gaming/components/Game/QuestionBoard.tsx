import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { enteredRoomState, userState, isRoundInProgress } from "../../../../../../../Recoil/atom";
import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import KnutuWebSocketHandler from './../../../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';

let remainTimeTimeout = null;

const QuestionBoard = () => {

  const [boardInput, setBoardInput] = useState("");
  const [timeGauge, setTimeGauge] = useState(0);
  const [roundOver, setRoundOver] = useState(true);
  const [remainTurnTimeNumber, setRemainTurnTimeNumber] = useState(0);
  const [remainRoundTimeNumber, setRemainRoundTimeNumber] = useState(0);
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

  useEffect(() => {
    console.log(room);
  }, [room]);

  useEffect(() => {
    if(RoundInProgress) {
      setRoundOver(false);
      remainTimeTimeout = null;
      setRemainTurnTimeNumber(remainRoundTime);
      setRemainRoundTimeNumber(limitTime * 1000);
    } 
  }, [RoundInProgress]);

  useEffect(() => {
    const timeoutCallback = (): void => {
      if (!RoundInProgress || roundOver) return;
      if (remainTurnTimeNumber < 0) {
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
        setRoundOver(true);

        return;
      }

      setRemainTurnTimeNumber((prev) => prev - 100);
      setRemainRoundTimeNumber((prev) => prev - 100);
      setTimeGauge(remainTurnTimeNumber / remainRoundTime);
      timeoutCallback();

      remainTimeTimeout = setTimeout(() => timeoutCallback(), 100);
    }

    if(remainTimeTimeout === null) {
      remainTimeTimeout = setTimeout(() => timeoutCallback());
    }

    return () => {
      clearTimeout(remainTimeTimeout);
    }

  }, [remainTurnTimeNumber]);

  return (
    <div className={styles.questionboard}>
      <div className={styles.board_suggestion}>{create_round}</div>
    <div className={styles.board_question}>
      {currWord ? currWord : roundWord[currRound - 1]}
      </div>
      <div className={styles.board_input_container}>
        <input className={styles.board_input} placeholder="여기에 입력해주세요" value={boardInput} onChange={onInputChange} onKeyPress={onKeyPress}/>
      </div>
      <div className={styles.timer}>
        <div className={styles.timeGauge} style={{position: "absolute", width: `${timeGauge} + "%"`, height: "100%", backgroundColor: "red"}}>
        </div>
        <span className={styles.remainTurnTime}>
          {(remainTurnTimeNumber / 1000).toFixed(1) + "초"}
        </span>
        <span className={styles.remainRoundTime}>
          {(remainRoundTimeNumber / 1000).toFixed(1) + "초"}
        </span>
      </div>
    </div>
  );
};

export default QuestionBoard;
