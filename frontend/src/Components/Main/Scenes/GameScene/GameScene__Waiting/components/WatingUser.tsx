import { useState } from "react";
import { useRecoilState } from "recoil";
import { readyState } from "../../../../../../Recoil/atom";
import knutu from "/src/Assets/Images/Knutu_64x64.jpg";
import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";

type userInfoType = {
  title?: string; // userTitle: 사용자 칭호
  profileFicture?: string; // userProfile: 사용자 프로필 src
  level: string; // userLevel: 사용자 레벨
  name: string; // userName: 사용자 이름
  isGameReady: boolean;
}

interface userInfoInterface {
  userinfo: userInfoType
}

const WatingUser = ({ userinfo }: userInfoInterface) => {
  const { name, title, profileFicture, level, isGameReady }: userInfoType = userinfo;

  let profilePicture = profileFicture || knutu;

  return (
    <div className={styles.wating_user_container}>
      <img src={profilePicture} className={styles.user_profile} />
      <div className={styles.user_level}>레벨 {level}</div>
      <div className={styles.user_title}>{title}</div>
      <div className={styles.user_name}>{name}</div>
      <div
        className={
          isGameReady === true
            ? `${styles.user_onready}`
            : `${styles.user_notready}`
        }
      >
        준비
      </div>
    </div>
  );
};

export default WatingUser;
