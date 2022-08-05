import { useRecoilState } from "recoil";
import { readyState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";

const GameRoomInfo = () => {
  const [readystate, setReadyState] = useRecoilState(readyState);

  const ready = () => {
    setReadyState(!readystate);
  };
  return (
    <div className={styles.roominfo}>
      <div className={styles.room_title}>
        [20] 나는 단수가 아니다 - 후치 네드발 레이디 제미니의 기사이자 헬턴트의
        초장이 후보
      </div>
      <div className={styles.room_condition}>
        한국어 끝말잇기 / 어인정 / 미션
      </div>
      <div className={styles.room_time}>라운드 5 / 60초</div>
      <div className={styles.wating_button}>
        <div className={styles.ready_button} onClick={ready}>준비</div>
        <div className={styles.exit_button}>나가기</div>
      </div>
    </div>
  );
};

export default GameRoomInfo;
