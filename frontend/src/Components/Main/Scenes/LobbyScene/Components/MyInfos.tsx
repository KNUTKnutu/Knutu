import styles from "../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { userState } from "../../../../../Recoil/atom";
import { useRecoilState } from "recoil";
import { Nullish, User } from "../../../../../interface";

const MyInfos = (): JSX.Element => {
  // const [user, setUser] = useRecoilState<Nullish<User>>(userState);
  const user = { name: "test", level: 6 };
  const { name, level } = user!;

  return (
    <div
      className={`${styles.lobby_scene_myInfos} ${styles.lobby_scene_components}`}
    >
      <div className={styles.lobby_scene_myInfos__top}>
        <div className={styles.lobby_scene_myInfos__character}>
          <img
            src="/src/Assets/Images/Knutu_64x64.jpg"
            width="64px"
            height="64px"
          />
        </div>
        <div className={styles.lobby_scene_myInfos__infoContainer}>
          <div className={styles.lobby_scene_myInfos__level}>
            <span>
              레벨 {level} {name}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.lobby_scene_myInfos__bottom}>
        <div className={styles.lobby_scene_myInfos__expFillColor} />
        <div className={styles.lobby_scene_myInfos__exp}>86,482 / 104,800</div>
      </div>
    </div>
  );
};

export default MyInfos;
