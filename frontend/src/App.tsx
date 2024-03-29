import styles from './App.module.scss';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import {
  enteredRoomIdState,
  enteredRoomState,
  fallState,
  isGameInProgress,
  mountOpacity,
  roomsState,
  usersState,
  userState,
  isRoundInProgress,
  gameSceneChatState,
  timerState,
  currentSceneState,
  afkTimeState,
} from './Recoil/atom';
import KnutuWebSocketHandler from './Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';
import { WebSocketPacket } from './Logic/Library/KnutuWebSocket/KnutuWebSocketTypes';
import KnutuAudioHandler from './Logic/Library/KnutuAudio/KnutuAudioHandler';
import { useEffect } from 'react';
import { put__exitRoom } from './Logic/API/PUT/put';
import { SCENE__LOBBYSCENE } from './constant';
import { AxiosError } from 'axios';

const App = () => {
  KnutuAudioHandler.getInstance().setLoop();

  const roomId = useRecoilValue(enteredRoomIdState);
  const [user, setUser] = useRecoilState(userState);
  const [enteredRoom, setEnteredRoom] = useRecoilState(enteredRoomState);
  const [gameSceneChats, setGameSceneChats] =
    useRecoilState(gameSceneChatState);
  
  
  const setCurrentScene = useSetRecoilState(currentSceneState);
  const setCurrentRoomsState = useSetRecoilState(roomsState);
  const setUsersState = useSetRecoilState(usersState);
  const setIsGameInProgress = useSetRecoilState(isGameInProgress);
  const setFallScene = useSetRecoilState(fallState);
  const setIsRoundInProgress = useSetRecoilState(isRoundInProgress);
  const setTimer = useSetRecoilState(timerState);
  const setAfkTime = useSetRecoilState(afkTimeState);

  // mount 시 Scene에 opacity:0 부여
  const [opacity, setOpacity] = useRecoilState(mountOpacity);

  const audio = KnutuAudioHandler.getInstance();
  const { number, title, lang, mode, rounds, limitTime, players } = enteredRoom;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(true);
    }, 200);

    const setDefaultVolume = (): void => {
      let vol =
        localStorage.getItem('localStoredVolume') === null
          ? null
          : Number(localStorage.getItem('localStoredVolume'));
      vol === null ? (vol = 40) : vol;
      localStorage.setItem('localStoredVolume', vol.toString());
      audio.setVolume(vol);
    };

    const createProfilePictureCache = (): void => {
      if (localStorage.getItem('profilePictures') !== null) {
        return;
      }
      localStorage.setItem('profilePictures', JSON.stringify({}));
    };

    const initApp = (): void => {
      setDefaultVolume();
      createProfilePictureCache();
    };

    initApp();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (user === null) return;
    const {
      preference: { masterVolume: volume },
    } = user;
    audio.setVolume(volume);
    localStorage.setItem('localStoredVolume', volume.toString());
  }, [user]);

  const messageListener = (msg: any) => {
    const json = JSON.parse(msg.data);
    const { body } = json;
    const { type } = json.header;

    console.log(json);

    const webSocketHandler: KnutuWebSocketHandler =
      KnutuWebSocketHandler.getInstance();

    const kickUser = () => {
      const payload = webSocketHandler.wrapPacket('requestExitRoom', {
        roomId,
        userName: user?.name,
      });
      webSocketHandler.send('requestExitRoom', payload);
      setCurrentScene(SCENE__LOBBYSCENE);
    };

    // TODO. switch문 따로 함수 구비 필요. 너무 굵어져 유지보수 힘듦
    switch (type) {
      case 'currentRooms':
        setCurrentRoomsState(body);
        webSocketHandler.send(
          'onLobbyEntrance',
          webSocketHandler.wrapPacket('onLobbyEntrance', {
            user,
          })
        );
        break;
      case 'onLobbyEntrance':
        // TODO. 로비에 들어가면서 이미 로그인 된 유저인지 한 번 더 체크하는 로직 필요.
        setUser(json.payload.data);
        break;
      case 'currentChannelInfo':
        // const users = Object.values(body.onlineUsers);
        const users = json.body;
        const sortedUsers: any = users.sort((a: any, b: any) => {
          return b.level - a.level;
        });
        setUsersState(sortedUsers);
        break;
      case 'onGameWaitingEntrance':
        const packet: WebSocketPacket = {
          header: {
            type: 'requestRoomInfo',
            date: new Date().getTime(),
          },
          payload: {
            roomId,
          },
        };
        webSocketHandler.send('requestRoomInfo', packet);
        break;
      case 'requestRoomInfo':
        setEnteredRoom(json.payload.data);
        webSocketHandler.send(
          'submitSessionInfo',
          webSocketHandler.wrapPacket('submitSessionInfo', {
            userName: user?.name,
            roomId,
          })
        );
        setTimer(true);
        break;
      case 'submitSessionInfo':
      case 'requestExitRoom':
      case 'requestToggleReady':
        setEnteredRoom(json.payload.data);
        setAfkTime(0);
        break;
      case 'onChatSubmitOnGameScene':
        setEnteredRoom(json.payload.data);
        setAfkTime(0);
        break;
      case 'allPlayerReady':
        audio.playOneShot(KnutuAudioHandler.clipAllUserReady);
        setFallScene(true);
        const startTime = performance.now();
        const {
          payload: {
            data: { roundWord },
          },
        } = json;
        setEnteredRoom({
          ...enteredRoom,
          roundWord,
          currWord: roundWord,
        });
        const endTime = performance.now();
        const loadingTime = endTime - startTime;
        const waitTime = loadingTime > 2000 ? loadingTime : 2000;
        setTimeout(() => setFallScene(false), waitTime);
        setTimeout(() => setIsGameInProgress(true), waitTime + 1000);
        break;
      case 'readyToProcessRound':
        setEnteredRoom(json.payload.data);
        audio.stop();
        audio.playOneShot(KnutuAudioHandler.clipOnRoundStart, 100, () => {
          webSocketHandler.send(
            'readyToRoundStart',
            webSocketHandler.wrapPacket('readyToRoundStart', {
              userName: user?.name,
              roomId,
            })
          );
        });
        break;
      case 'readyToRoundStart':
        audio.stop();
        audio.play(KnutuAudioHandler.clipOnRound);
        setEnteredRoom(json.payload.data);
        setIsRoundInProgress(true);
        break;
      case 'onTurnProcess':
        setEnteredRoom(json.payload.data);
        setIsRoundInProgress(true);
        break;
      case 'onWordCorrect':
        audio.playOneShot(KnutuAudioHandler.clipOnWordCorrect);
        setEnteredRoom(JSON.parse(json.payload.data.currentRoomState));
        setTimeout(() => {
          const payload = KnutuWebSocketHandler.getInstance().wrapPacket(
            'onTurnProcess',
            {
              roomId,
              userName: user?.name,
            }
          );
          KnutuWebSocketHandler.getInstance().send('onTurnProcess', payload);
        }, 1000);
        setIsRoundInProgress(false);
        break;
      case 'onWordIncorrect':
        audio.playOneShot(KnutuAudioHandler.clipOnWordIncorrect);
        break;
      case 'onRoundEnd':
        audio.stop();
        audio.playOneShot(KnutuAudioHandler.clipOnRoundEnd, 100, () => {
          setTimeout(() => {
            const payload = KnutuWebSocketHandler.getInstance().wrapPacket(
              'readyToProcessRound',
              {
                roomId,
                userName: user?.name,
              }
            );
            KnutuWebSocketHandler.getInstance().send(
              'readyToProcessRound',
              payload
            );
          }, 3000);
        });
        setEnteredRoom(json.payload.data);
        setIsRoundInProgress(false);
        // 라운드 끝났을 때의 로직
        break;
    }
  };

  KnutuWebSocketHandler.onMessageReceiver = messageListener;

  return (
    <div className={styles.App}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
