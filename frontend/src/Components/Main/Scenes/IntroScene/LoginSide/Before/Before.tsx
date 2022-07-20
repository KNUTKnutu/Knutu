import { LOGIN, SINGNUP } from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import { BeforeProps } from "../../../../../../interface";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Before/_before.module.scss";

// Ing, SignUp으로 이동만 하는 컴포넌트
const Before = ({ setLoginState }: BeforeProps) => {
  const onClickLoginBtn = () => {
    setLoginState(LOGINSTATE.Ing);
  };

  const onClickSignUpBtn = () => {
    setLoginState(LOGINSTATE.SignUp);
  };
  return (
    <div className={styles.login_signup_button_wrapper}>
      <div className={styles.login_btn_wrapper}>
        <span className={styles.login_btn} onClick={onClickLoginBtn}>
          {LOGIN}
        </span>
      </div>
      <hr />
      <div className={styles.signup_btn_wrapper}>
        <span className={styles.signup_btn} onClick={onClickSignUpBtn}>
          {SINGNUP}
        </span>
      </div>
    </div>
  );
};

export default Before;
