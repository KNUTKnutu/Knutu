import { useRecoilValue } from "recoil";
import { enteredRoomState } from "../../../../../../../Recoil/atom";
import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";

const Timer = () => {
  const roomState = useRecoilValue(enteredRoomState);

  const {turnRemainTime, limitTime} = roomState;

  const displayTurnRemainTime = getDisplayTurnRemainTime(turnRemainTime);
  const displayLimitTime = getDisplayLimitTime(limitTime);

  return (
    <div className={styles.timer}>
      <span>
        {displayTurnRemainTime}
      </span>
      <span>
        {displayLimitTime}
      </span>
    </div>
  );
};

const getDisplayTurnRemainTime = (_turnRemainTime: number) => {
  return `${(_turnRemainTime / 1000).toString().split(".")[0]}.${(_turnRemainTime % 1000).toString()[0]} 초`;
};

const getDisplayLimitTime = (getDisplayLimitTime: number) => {
  return `${getDisplayLimitTime} 초`;
};

export default Timer;
