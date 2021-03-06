import { FormEvent } from "react";
import { useSetRecoilState } from "recoil";
import { ID, LOGIN, MAINTAIN, PW, SINGNUP } from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import { LoginIngProps } from "../../../../../../interface";
import { userState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Ing/_loginIng.module.scss";

// 로그인하는 컴포넌트, 서버에 get요청을 보냄.
const LoginIng = ({ setLoginState }: LoginIngProps) => {
  const setUser = useSetRecoilState(userState);

  const onClickSignUp = () => {
    setLoginState(LOGINSTATE.SignUp);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
    // axios - get(login)
    const res = { name: "test_name", level: 2, win_count: 3 };
    if (res !== null || res !== undefined) {
      setUser(res);
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
