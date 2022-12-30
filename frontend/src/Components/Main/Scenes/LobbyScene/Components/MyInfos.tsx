import styles from "../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import knutu from "/src/Assets/Images/Knutu_64x64.jpg";
import { userState } from "../../../../../Recoil/atom";
import { User } from "../../../../../interface";
import { useRecoilValue } from "recoil";

const AVATAR_CONF__WIDTH = "64px";
const AVATAR_CONF__HEIGHT = "64px";

const getDisplayName = (level: number, title: string, name: string): string => `레벨 ${level} ${title} ${name}`;
const getDisplayExperience = (currExp: number, totalExp: number): string => `${currExp} / ${totalExp}`;
const getExpBarWidth = (currExp: number, totalExp: number): string => `${currExp / totalExp * 100}%`;

const MyInfos = (): JSX.Element => {
  // const [user, setUser] = useRecoilState<Nullable<User>>(userState);
  // TODO : userState error 해결 필요. 이로 인해 build가 불가능
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
            src={knutu}
            width={AVATAR_CONF__WIDTH}
            height={AVATAR_CONF__HEIGHT}
          />
        </div>
        <div className={styles.lobby_scene_myInfos__infoContainer}>
          <div className={styles.lobby_scene_myInfos__info}>
            <span>
              {getDisplayName(level, title, name)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.lobby_scene_myInfos__bottom}>
        <div className={styles.lobby_scene_myInfos__expFillColor} style={{width: getExpBarWidth(currentExperience, totalExperience)}} />
        <div className={styles.lobby_scene_myInfos__exp}>{getDisplayExperience(currentExperience, totalExperience)}</div>
      </div>
    </div>
  );
};

export default MyInfos;
