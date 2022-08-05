import { useState } from "react";
import { useRecoilState } from "recoil";
import { readyState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";

interface userInfoInterface {
  userinfo: {
    userFull?: number;
    userProfile?: string;
    userLevel?: string;
    userName?: string;
    userTitle?: string;
  };
}

const WatingUser = ({ userinfo }: userInfoInterface) => {
  const [readystate, setReadyState] = useRecoilState(readyState);

  return (
    <div className={styles.wating_user_container}>
      <img src={userinfo.userProfile} className={styles.user_profile} />
      <div className={styles.user_level}>{userinfo.userLevel}</div>
      <div className={styles.user_name}>{userinfo.userName}</div>
      <div className={styles.user_title}>{userinfo.userTitle}</div>
      <div
        className={
          readystate === true
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
