import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import knutu from "/src/Assets/Images/Knutu_64x64.jpg";
import { userState } from "../../../../../../Recoil/atom";
import { useRecoilValue } from "recoil";

const getLevelString = (level: number, title: string): string => `레벨 ${level} ${title}`;
const getExperienceString = (currentExp: number, totalExperience: number): string => `${currentExp} / ${totalExperience}`;
const getExpBarWidth = (currExp: number, totalExp: number): string => `${currExp / totalExp * 100}%`;

const UserInfo = () => {

  const user = useRecoilValue(userState);

  if(user == null) return <></>;

  const { name, level, title, profilePicture, currentExperience, totalExperience }: any = user;

  if(profilePicture) {
    // 프로필 사진을 knutu가 아닌 다른 거로 가져오는 로직
  }

  return (
    <div className={styles.userinfo}>
      <img
        src={knutu}
        className={styles.user_profile}
      />
      <span className={styles.user_level}>{getLevelString(level, title)}</span>
      <span className={styles.user_name}>{name}</span>
      <div className={styles.expbar}>
        <div className={styles.game_expFillColor} style={{width: getExpBarWidth(currentExperience, totalExperience)}} />
        <div className={styles.game_exp}>{getExperienceString(currentExperience, totalExperience)}</div>
      </div>
    </div>
  );
};

export default UserInfo;
