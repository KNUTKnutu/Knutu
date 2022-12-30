import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import knutu from "/src/Assets/Images/Knutu_64x64.jpg";
import { userState } from "../../../../../../Recoil/atom";
import { useRecoilValue } from "recoil";

const getLevelString = (level: number): string => `Level ${level}`;
const getExperienceString = (currentExp: number, remainingExp: number): string => `${currentExp} / ${remainingExp}`;

const UserInfo = () => {

  const user = useRecoilValue(userState);

  const { name, level, profilePicture, currentExperience, remainExperience }: any = user;

  if(profilePicture) {
    // 프로필 사진을 knutu가 아닌 다른 거로 가져오는 로직
  }

  return (
    <div className={styles.userinfo}>
      <img
        src={knutu}
        className={styles.user_profile}
      />
      <span className={styles.user_level}>{getLevelString(level)}</span>
      <span className={styles.user_name}>{name}</span>
      <div className={styles.expbar}>
        <div className={styles.game_expFillColor} />
        <div className={styles.game_exp}>{getExperienceString(currentExperience, remainExperience)}</div>
      </div>
    </div>
  );
};

export default UserInfo;
