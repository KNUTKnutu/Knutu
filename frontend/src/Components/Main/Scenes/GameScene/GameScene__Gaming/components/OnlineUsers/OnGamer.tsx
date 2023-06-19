import { useRecoilValue } from "recoil";
import {
  currentUserState,
  enteredRoomState,
  userState,
} from "../../../../../../../Recoil/atom";
import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import knutu from "/src/Assets/Images/Knutu_64x64.jpg";
import { useEffect, useState } from "react";

const OnGamer = ({ userinfo }: any) => {
  const profilePicture = userinfo.profileFicture || knutu;
  const getUserLevelString = (level: number): string => `레벨 ${level}`;
  const room = useRecoilValue(enteredRoomState);
  const [myTurn, setMyTurn] = useState(false);
  const [firstMount, setFirstMount] = useState(true);
  useEffect(() => {
    if (room.currTurn === userinfo?.name) {
      setMyTurn(true);
    } else {
      setMyTurn(false);
    }
    setFirstMount(false);
  }, [room.currTurn, myTurn]);

  return (
    <div
      className={`${styles.gamer} ${
        myTurn ? styles.my_turn : styles.your_turn
      } ${firstMount ? styles.first_mount : ""}`}
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
