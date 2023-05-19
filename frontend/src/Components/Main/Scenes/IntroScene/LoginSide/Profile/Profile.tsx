import { useRecoilState, useSetRecoilState } from "recoil";
import { LOGOUT, TITLE } from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import { Nullable, User } from "../../../../../../interface";
import {
  channelsState,
  isLoggedOutRecently,
  userState,
} from "../../../../../../Recoil/atom";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Profile/_profile.module.scss";
import DEFAULT_PROFILE from "../../../../../../Assets/Images/default_profile.svg";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
  user: Nullable<User>;
}

const EDIT = <span className="material-icons">edit</span>;

const Profile = ({ setCurrLoginState, user }: Props) => {
  if (user == null) return <></>;

  const { name, title, profilePicture, level, currentExperience } =
    user as User;

  const setUser = useSetRecoilState(userState);
  const setIsLoggedOut = useSetRecoilState(isLoggedOutRecently);

  /**
   * 로그아웃하면 Channel List를 비워줘야 하기 때문에 선언
   */
  const setChannels = useSetRecoilState(channelsState);

  /**
   * 로그아웃 버튼을 눌렀을 때 실행
   * 로그인 화면으로 바꿔줘야 함 -> LOGINSTATE를 LOGIN으로 교체
   * user atom을 비워줘야 함 -> setUser(null)
   * 채널 목록을 비워줘야 함 -> setChannel([])
   */
  const onClickLogout = () => {
    setIsLoggedOut(true);
    setCurrLoginState(LOGINSTATE.LOGIN);
    setUser(null);
    setChannels([]);
  };

  /**
   * img가 엑박 뜰 경우 대체 이미지 설정
   */
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
          <div>
            {EDIT}
            <img src={profilePicture} alt="profilePicture" onError={onErrorImg} />
          </div>
          <span className={styles.title}>{title}{EDIT}</span>
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
