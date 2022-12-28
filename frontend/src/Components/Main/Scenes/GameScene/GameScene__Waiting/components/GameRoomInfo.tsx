import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import { enteredRoomState, readyState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import { currentSceneState } from "../../../../../../Recoil/atom";
import { SCENE__LOBBYSCENE } from "../../../../../../constant";
import { RoomClass } from "../../../LobbyScene/Components/Rooms/Class/Room";

const GameRoomInfo = () => {
  const [readystate, setReadyState] = useRecoilState(readyState);

  const roomState = useRecoilValue(enteredRoomState);

  console.log(roomState);

  const setCurrentScene = useSetRecoilState(currentSceneState);

  const { number, title, lang, mode, rounds, limitTime, players } = roomState;

  const getout = (e: any) => {
    setCurrentScene(SCENE__LOBBYSCENE);
  };

  const ready = () => {
    setReadyState(!readystate);
  };

  const modeInTotal = RoomClass.getRoomOptionString(mode, lang);

  return (
    <div className={styles.roominfo}>
      <div className={styles.room_title}>
        [{number}] {title}
      </div>
      <div className={styles.room_condition}>
        {modeInTotal}
      </div>
      <div className={styles.room_time}>{rounds} / {limitTime}</div>
      <div className={styles.wating_button}>
        <div className={styles.ready_button} onClick={ready}>
          준비
        </div>
        <div className={styles.exit_button} onClick={getout}>
          나가기
        </div>
      </div>
    </div>
  );
};

export default GameRoomInfo;
