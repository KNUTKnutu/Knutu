import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import knutu from "/src/Assets/Images/Knutu_64x64.jpg";

const OnGamer = ({userinfo}:any) => {
  const profilePicture = userinfo.profileFicture || knutu;
  const getUserLevelString = (level: number): string => `레벨 ${level}`;

  return (
    <div className={styles.gamer}>
        <div className={styles.name}>{userinfo.name}</div>
        <img className={styles.profile} src={profilePicture} alt="knutu" />
        <div className={styles.level}>{getUserLevelString(userinfo.level)}</div>
        <div className={styles.score}>{userinfo.score}</div>
    </div>
  )
}

export default OnGamer