import { SetStateAction } from "react";
import { LOGOUT } from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/After/_after.module.scss";

interface AfterProps {
  setLoginState: React.Dispatch<SetStateAction<LOGINSTATE>>;
}

const res = { name: "test_name", level: 2, win_count: 3 };

const After = ({ setLoginState }: AfterProps) => {
  const { name, level, win_count } = res;

  const onClickLogout = () => {
    setLoginState(LOGINSTATE.Before);
  };
  return (
    <div className={styles.user_container}>
      <div className={styles.user_info_wrapper}>
        <div className={styles.user_info}>
          <span>LEVEL: {level}</span>
          <span>{win_count}승</span>
        </div>
        <div className={styles.logout_wrapper}>
          <span onClick={onClickLogout}>{LOGOUT}</span>
        </div>
      </div>
      <hr />
      <div className={styles.user_name_wrapper}>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default After;
