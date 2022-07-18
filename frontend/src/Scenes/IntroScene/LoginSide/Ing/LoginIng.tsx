import { FormEvent, SetStateAction } from "react";
import { ID, LOGIN, MAINTAIN, PW, SINGNUP } from "../../../../constant";
import { LOGINSTATE } from "../../../../enum";
import styles from "./_loginIng.module.scss";

interface LoginIngProps {
  setLoginState: React.Dispatch<SetStateAction<LOGINSTATE>>;
}

const LoginIng = ({ setLoginState }: LoginIngProps) => {
  const onClickSignUp = () => {
    setLoginState(LOGINSTATE.SignUp);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
    // axios - get(login)
    const res = { name: "test_name" };
    if (res !== null || res !== undefined) {
      console.log("change State");
      setLoginState(LOGINSTATE.After);
    }

    return res;
  };

  return (
    <div className={styles.login_ing_container}>
      <form onSubmit={onSubmit}>
        <div className={styles.login_head_container}>
          <span className={styles.login_head}>{LOGIN}</span>
        </div>
        <hr />
        <div className={styles.login_submit_container}>
          <div className={styles.input_wrapper}>
            <input type="text" id="id" autoComplete="off" placeholder=" " />
            <label htmlFor="id">{ID}</label>
          </div>
          <div className={styles.input_wrapper}>
            <input type="password" id="pw" autoComplete="off" placeholder=" " />
            <label htmlFor="pw">{PW}</label>
          </div>
          <div className={styles.maintain_wrapper}>
            <input type="checkbox" id="maintain" />
            <label htmlFor="maintain">{MAINTAIN}</label>
          </div>
          <div className={styles.login_btn_wrapper}>
            <button>{LOGIN}</button>
          </div>
        </div>
        <hr />
        <div className={styles.login_etc_container}>
          <span onClick={onClickSignUp}>{SINGNUP}</span>
          <span>아이디/비밀번호 찾기</span>
        </div>
      </form>
    </div>
  );
};

export default LoginIng;
