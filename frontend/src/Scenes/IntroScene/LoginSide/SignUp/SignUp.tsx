import { FormEvent, SetStateAction } from "react";
import {
  CHECK_PW,
  ID,
  MAINTAIN,
  NAME,
  PW,
  SINGNUP,
} from "../../../../constant";
import { LOGINSTATE } from "../../../../enum";
import styles from "../../../../styles/Scenes/IntroScene/LoginSide/SignUp/_signUp.module.scss";

interface SignUpProps {
  setLoginState: React.Dispatch<SetStateAction<LOGINSTATE>>;
}

const SignUp = ({ setLoginState }: SignUpProps) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("signup");
    setLoginState(LOGINSTATE.Before);
  };

  return (
    <div className={styles.signup_container}>
      <form onSubmit={onSubmit}>
        <div className={styles.signup_head_container}>
          <span className={styles.signup_head}>{SINGNUP}</span>
        </div>
        <hr />
        <div className={styles.signup_submit_container}>
          <div className={styles.input_wrapper}>
            <input type="text" id="id" autoComplete="off" placeholder=" " />
            <label htmlFor="id">{ID}</label>
          </div>
          <div className={styles.input_wrapper}>
            <input type="password" id="pw" autoComplete="off" placeholder=" " />
            <label htmlFor="pw">{PW}</label>
          </div>
          <div className={styles.input_wrapper}>
            <input
              type="password"
              id="check_pw"
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="check_pw">{CHECK_PW}</label>
          </div>
          <div className={styles.input_wrapper}>
            <input type="text" id="name" autoComplete="off" placeholder=" " />
            <label htmlFor="name">{NAME}</label>
          </div>
          <div className={styles.signup_btn_wrapper}>
            <button>{SINGNUP}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
