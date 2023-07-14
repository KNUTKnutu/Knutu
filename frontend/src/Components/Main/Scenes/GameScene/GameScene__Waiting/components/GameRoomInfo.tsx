import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRecoilState } from 'recoil';
import {
  afkTimeState,
  enteredRoomIdState,
  enteredRoomState,
  readyState,
  timerState,
  userState,
} from '../../../../../../Recoil/atom';
import styles from '../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss';
import { currentSceneState } from '../../../../../../Recoil/atom';
import { SCENE__LOBBYSCENE } from '../../../../../../constant';
import { RoomClass } from '../../../LobbyScene/Components/Rooms/Class/Room';
import { put__exitRoom } from '../../../../../../Logic/API/PUT/put';
import { AxiosError } from 'axios';
import KnutuWebSocketHandler from '../../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';
import { useEffect, useState } from 'react';
import Dim from '../../../../../Dim/Dim';

const GameRoomInfo = () => {
  const [readystate, setReadyState] = useRecoilState(readyState);

  const roomState = useRecoilValue(enteredRoomState);
  const roomId = useRecoilValue(enteredRoomIdState);
  const user = useRecoilValue(userState);
  const [timer, setTimer] = useRecoilState(timerState);

  const [afkTime, setAfkTime] = useRecoilState(afkTimeState);
  const setCurrentScene = useSetRecoilState(currentSceneState);

  const [showAlert, setShowAlert] = useState(false);

  if (roomState == null) return <></>;

  const { number, title, lang, mode, rounds, limitTime, players } = roomState;

  const webSocketHandler: KnutuWebSocketHandler =
    KnutuWebSocketHandler.getInstance();

  const getout = async (): Promise<void> => {
    const res = await put__exitRoom(number, user!.name);
    const payload = webSocketHandler.wrapPacket('requestExitRoom', {
      roomId,
      userName: user?.name,
    });
    webSocketHandler.send('requestExitRoom', payload);

    if (res !== null && !(res instanceof AxiosError)) {
      setCurrentScene(SCENE__LOBBYSCENE);
    } else {
      window.alert('채널에 입장할 수 없습니다. 다시 시도해주세요.');
    }
    setShowAlert(false);
    setTimer(false);
  };

  const ready = () => {
    setReadyState(!readystate);
    const payload = webSocketHandler.wrapPacket('requestToggleReady', {
      roomId,
      userName: user?.name,
    });
    webSocketHandler.send('requestToggleReady', payload);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer) {
      interval = setInterval(() => {
        setAfkTime((timer) => timer + 1);
      }, 60 * 1000); // 1분마다 afkTime 값 증가
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (afkTime === 4) { // 4분동안 입력이 없으면 경고창을 띄움
      setShowAlert(true);
    }
    if (afkTime === 5) { // 5분동안 입력이 없을 시 로비로 내보냄
      getout();
    }
  }, [afkTime]);

  const modeInTotal = RoomClass.getRoomOptionString(mode, lang);

  const clickAlert = () => setShowAlert(false);

  return (
    <>
      <div className={styles.roominfo}>
        <div className={styles.room_title}>
          [{number}] {title}
        </div>
        <div className={styles.room_condition}>{modeInTotal}</div>
        <div className={styles.room_time}>
          라운드 {rounds} / {limitTime} 초
        </div>
        <div className={styles.room_time}>
          여기에 무엇을~~ 넣을까 고민 중이랍니다~~
        </div>
        <div className={styles.wating_button}>
          <div className={styles.ready_button} onClick={ready}>
            준비
          </div>
          <div className={styles.exit_button} onClick={getout}>
            나가기
          </div>
        </div>
      </div>
      {showAlert && (
        <Dim
          children={
            <div onClick={clickAlert}>
              1분 내 준비, 혹은 1개 이상의 채팅 중 하나 이상의 행동이 없을 시,
              잠수로 간주하여, 로비로 추방됩니다.
            </div>
          }
        />
      )}
    </>
  );
};

export default GameRoomInfo;
