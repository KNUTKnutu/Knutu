import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { enteredRoomState, userState, isRoundInProgress } from "../../../../../../../Recoil/atom";
import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import KnutuWebSocketHandler from './../../../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if(!(e && user)) return;
    if(e.key === 'Enter' && RoundInProgress) {
      if(isMyTurn()) {
        if(validateAnswer()) {
          const payload = KnutuWebSocketHandler.getInstance().wrapPacket("wordSubmit", {
            roomId: room.number,
            userName: user?.name,
            word: boardInput
          });
          KnutuWebSocketHandler.getInstance().send("wordSubmit", payload);
        }
        // 끝말잇기 성립이 되지 않은 경우 채팅으로 간주
      }
    }
  }

  const isMyTurn = (): boolean => {
    return room.currTurn === user?.name;
  }

  const validateAnswer = (): boolean => {
    // 현재는 끝말잇기만 생각하고 일단 작업하기로.
    return boardInput[0] === getDisplayWord()[getDisplayWord().length - 1];
  }

  const getDisplayWord = (): string => {
    return currWord ? currWord : roundWord[currRound - 1];
  }

  useEffect(() => {
    console.log(room);
  }, [room]);

  useEffect(() => {
    if(RoundInProgress) {
      setRoundOver(false);
      setRemainTurnTimeNumber(remainRoundTime);
      setRemainRoundTimeNumber(limitTime * 1000);
    } 
  }, [RoundInProgress]);

  useEffect(() => {
    const timerInterval: NodeJS.Timer = setInterval(() => {
      if(remainTurnTimeNumber === 0) {
        if(RoundInProgress) {
          if(room.currTurn === user?.name) {
            const payload = KnutuWebSocketHandler.getInstance().wrapPacket("onRoundEnd", {
              roomId: room.number,
              userName: user?.name
            });
            KnutuWebSocketHandler.getInstance().send("onRoundEnd", payload);
          }
          setRemainTurnTimeNumber(0);
          setRemainRoundTimeNumber(0);
          setTimeGauge(0);
          return;
        }
      } else {
        setRemainTurnTimeNumber((prev) => prev - 100 > 0 ? prev - 100 : 0);
        setRemainRoundTimeNumber((prev) => prev - 100 > 0 ? prev - 100 : 0);
        setTimeGauge((remainTurnTimeNumber / remainRoundTime) * 100);
      }
    }, 100);

    return () => clearInterval(timerInterval);
  });

  return (
    <div className={styles.questionboard}>
      <div className={styles.board_suggestion}>{create_round}</div>
      <div className={styles.board_question}>
      {getDisplayWord()}
      <div className={styles.description}>
        {}
      </div>
      </div>
      <div className={styles.board_input_container}>
        <input className={`${styles.board_input} ${isMyTurn() && styles.board_input_active}`} placeholder="여기에 입력해주세요" value={boardInput} onChange={(e) => onInputChange(e)} onKeyDown={(e) => onKeyDown(e)}/>
      </div>
      <div className={styles.timer}>
        <div className={styles.timeGauge} style={{width: `${timeGauge}%`}}>
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
