import { SetStateAction } from "react";
import { LOGIN, SINGNUP } from "../../../../constant";
import { LOGINSTATE } from "../../../../enum";
import styles from "./_before.module.scss";

interface BeforeProps {
  setLoginState: React.Dispatch<SetStateAction<LOGINSTATE>>;
}

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
