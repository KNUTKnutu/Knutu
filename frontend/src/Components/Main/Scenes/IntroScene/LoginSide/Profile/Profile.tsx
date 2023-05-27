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
import { postProfilePicture } from './../../../../../../Logic/API/POST/post';
import { getProfilePicture } from './../../../../../../Logic/API/GET/get';

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
  user: Nullable<User>;
}

const Profile = ({ setCurrLoginState, user }: Props) => {
  if (user == null) return <></>;

  const { id, name, title, profilePicture, level, currentExperience, profilePictureFile } =
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

  const onProfilePictureEditBtnClicked = (): void => {
    const tempFileReader = document.createElement("input");
    tempFileReader.type = 'file';
    tempFileReader.accept = 'image/*';
    tempFileReader.addEventListener('change', handleFileSelect, false);
    tempFileReader.click();
  }

  const handleFileSelect = (): void => {
    const selectedFile = event.target.files[0];

    if(selectedFile === undefined || selectedFile === null) {
      return window.alert("선택된 파일이 올바르지 않습니다.");
    }

    console.log(selectedFile);

    postProfilePicture(selectedFile, id).then(() => {
      getProfilePicture(id).then((result) => {
        const { data } = result;
        const _user = {
          ...user,
          profilePictureFile: data
        }
        setUser(_user);
        
        const profilePicturesPayload = JSON.parse(localStorage.getItem("profilePictures"));
        if(profilePicturesPayload[id] == 0) {
          const payloadToSave = {
            ...profilePicturesPayload,
            id: _user.profilePictureFile
          }
          localStorage.setItem("profilePictures", JSON.stringify(payloadToSave));
        }

        // const saveImageToLocalStorage = (key, image) => {
        //   const reader = new FileReader();
        //   reader.onloadend = function () {
        //     const imageDataUrl = reader.result;
        //     localStorage.setItem(key, imageDataUrl);
        //   };
        //   reader.readAsDataURL(image);
        // }

        // const displayImageFromLocalStorage = (key, elementId) => {
        //   const imageDataUrl = localStorage.getItem(key);
        //   if (imageDataUrl) {
        //     const imageElement = document.getElementById(elementId);
        //     imageElement.src = imageDataUrl;
        //   }
        // }

      })
    }).catch((e) => {
      console.error(e);
      window.alert(e);
    });
  }

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
            <span className="material-icons" onClick={onProfilePictureEditBtnClicked}>edit</span>
            <img src={profilePictureFile ? profilePictureFile : DEFAULT_PROFILE} alt="profilePicture" onError={onErrorImg} />
          </div>
          <span className={styles.title}>
            {title}
            <span className="material-icons" onClick={onProfilePictureEditBtnClicked}>edit</span>
          </span>
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
