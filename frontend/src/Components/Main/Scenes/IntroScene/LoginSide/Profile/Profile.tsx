import { useSetRecoilState } from "recoil";
import { LOGOUT, TITLE } from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import { userState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Profile/_profile.module.scss";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
  name: string;
  title: string;
  profilePicture: string;
  level: number;
  currentExperience: number;
  isAccountgaemaeneo: boolean;
}

const ThumbUp = (
  <span className="material-icons" style={{ color: "blue" }}>
    thumb_up_alt
  </span>
);
const ThumbDown = (
  <span className="material-icons" style={{ color: "red" }}>
    thumb_down_alt
  </span>
);

const Profile = ({
  setCurrLoginState,
  name,
  title,
  profilePicture,
  level,
  currentExperience,
  isAccountgaemaeneo,
}: Props) => {
  const setUser = useSetRecoilState(userState);

  const onClickLogout = () => {
    setCurrLoginState(LOGINSTATE.LOGIN);
    setUser(null);
  };
  return (
    <div className={styles.profile}>
      <div className={styles.title}>
        <h2>{TITLE}</h2>
      </div>
      <div className={styles.player}>
        <div className={styles.sub}>
          <img src={profilePicture} alt="profilePicture" />
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.main}>
          <div className={styles.name}>
            <span>{name}</span>
          </div>
          <div className={styles.levelWrapper}>
            <span>레벨: {level}</span>|
            <span>현재 경험치: {currentExperience}</span>
          </div>
        </div>
      </div>
      <div className={styles.logout}>
        <button onClick={onClickLogout}>{LOGOUT}</button>
      </div>
    </div>
  );
};

export default Profile;
