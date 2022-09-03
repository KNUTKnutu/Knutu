import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import { userState } from "../../../../../../Recoil/atom";
import { useRecoilState } from "recoil";

const UserInfo = () => {
  // const [user, setUser] = useRecoilState<Nullable<User>>(userState);
  const user = { name: "샌슨 퍼시발", level: 6 };
  const { name, level } = user!;

  return (
    <div className={styles.userinfo}>
      <img
        src="/src/Assets/Images/Knutu_64x64.jpg"
        className={styles.user_profile}
      />
      <span className={styles.user_level}>Level {level}</span>
      <span className={styles.user_name}>{name}</span>
      <div className={styles.expbar}>
        <div className={styles.game_expFillColor} />
        <div className={styles.game_exp}>41,920 / 104,800</div>
      </div>
    </div>
  );
};

export default UserInfo;
