import styles from "../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { userState } from "../../../../../Recoil/atom";
import { User } from "../../../../../interface";
import { useRecoilValue } from "recoil";

const MyInfos = (): JSX.Element => {
  // const [user, setUser] = useRecoilState<Nullable<User>>(userState);
  const recoilValueUser = useRecoilValue<User>(userState);
  const user = recoilValueUser ?? {name: null, level: null};
  const { name, level, title, currentExperience, totalExperience } = user;

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
          <div className={styles.lobby_scene_myInfos__info}>
            <span>
              레벨 {level} {title} {name}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.lobby_scene_myInfos__bottom}>
        <div className={styles.lobby_scene_myInfos__expFillColor} />
        <div className={styles.lobby_scene_myInfos__exp}>{currentExperience} / {totalExperience}</div>
      </div>
    </div>
  );
};

export default MyInfos;
