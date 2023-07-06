import { useRecoilValue } from 'recoil';
import {
  currentUserState,
  enteredRoomState,
  isGameInProgress,
  userState,
} from '../../../../../../../Recoil/atom';
import styles from '../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss';
import knutu from '/src/Assets/Images/Knutu_64x64.jpg';
import { useEffect, useState } from 'react';

const OnGamer = ({ userinfo }: any) => {
  const profilePicture = userinfo.profileFicture || knutu;
  const getUserLevelString = (level: number): string => `레벨 ${level}`;
  const room = useRecoilValue(enteredRoomState);
  const gameprgreess = useRecoilValue(isGameInProgress);
  const [myTurn, setMyTurn] = useState(false);

  const [firstMount, setFirstMount] = useState(true);
  if (gameprgreess === true) {
    setTimeout(() => setFirstMount(false), 1000);
  }
  useEffect(() => {
    if (room.currTurn === userinfo?.name) {
      setMyTurn(true);
    } else {
      setMyTurn(false);
    }
  }, [room.currTurn, myTurn]);

  return (
    <div
      className={`${styles.gamer} ${firstMount ? styles.first_mount : ''} ${
        myTurn ? styles.my_turn : styles.your_turn
      }`}
    >
      <div className={styles.name}>{userinfo.name}</div>
      <img className={styles.profile} src={profilePicture} alt="knutu" />
      <div className={styles.level}>{getUserLevelString(userinfo.level)}</div>
      <div className={styles.score}>{userinfo.score}</div>
      <div className={styles.cover}></div>
    </div>
  );
};

export default OnGamer;
