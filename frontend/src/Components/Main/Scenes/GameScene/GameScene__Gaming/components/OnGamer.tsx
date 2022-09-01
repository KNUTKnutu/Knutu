import styles from "../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";

const OnGamer = ({userinfo}:any) => {
  return (
    <div className={styles.gamer}>
        <div className={styles.name}>{userinfo.userinfo.username}</div>
        <img className={styles.profile} src={userinfo.userinfo.userprofile} alt="knutu" />
        <div className={styles.level}>Lv {userinfo.userinfo.userlevel}</div>
        <div className={styles.score}>{userinfo.userinfo.userscore}</div>
    </div>
  )
}

export default OnGamer