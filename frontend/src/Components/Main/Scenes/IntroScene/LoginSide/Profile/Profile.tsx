import { useSetRecoilState } from "recoil";
import { LOGOUT, TITLE } from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import { Nullable, User } from "../../../../../../interface";
import { userState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Profile/_profile.module.scss";
import DEFAULT_PROFILE from "../../../../../../Assets/Images/default_profile.svg";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
  user: Nullable<User>;
}

const Profile = ({ setCurrLoginState, user }: Props) => {
  const { name, title, profilePicture, level, currentExperience } =
    user as User;
  const setUser = useSetRecoilState(userState);

  const onClickLogout = () => {
    setCurrLoginState(LOGINSTATE.LOGIN);
    setUser(null);
  };

  // img가 엑박 뜰 경우 대체 이미지 설정
  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_PROFILE;
  };
  return (
    <div className={styles.profile}>
      <div className={styles.title}>
        <h2>{TITLE}</h2>
      </div>
      <div className={styles.player}>
        <div className={styles.sub}>
          <img src={profilePicture} alt="profilePicture" onError={onErrorImg} />
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
