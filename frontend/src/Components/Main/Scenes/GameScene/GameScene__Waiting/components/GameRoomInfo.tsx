import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import { enteredRoomState, readyState, userState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import { currentSceneState } from "../../../../../../Recoil/atom";
import { SCENE__LOBBYSCENE } from "../../../../../../constant";
import { RoomClass } from "../../../LobbyScene/Components/Rooms/Class/Room";
import { put__exitRoom } from "../../../../../../Logic/API/PUT/put";
import { AxiosError } from "axios";

const GameRoomInfo = () => {
  const [readystate, setReadyState] = useRecoilState(readyState);

  const roomState = useRecoilValue(enteredRoomState);
  const user = useRecoilValue(userState);

  const setCurrentScene = useSetRecoilState(currentSceneState);

  const { number, title, lang, mode, rounds, limitTime, players } = roomState;

  const getout = async (e: any): Promise<void> => {
    const res = await put__exitRoom(number, user!.name);

    if (res !== null && !(res instanceof AxiosError)) {
      setCurrentScene(SCENE__LOBBYSCENE);

    } else {
      window.alert("채널에 입장할 수 없습니다. 다시 시도해주세요.");
    }

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
      <div className={styles.room_time}>라운드 {rounds} / {limitTime} 초</div>
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
