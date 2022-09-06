import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Login/_login.module.scss";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
}

const Login = ({ setCurrLoginState }: Props) => {
  const [input, setInput] = useState({ id: "", pw: "" });
  const { id, pw } = input;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // input get
    console.log(input);
  };

  const onClickSignup = () => {
    setCurrLoginState(LOGINSTATE.SIGNUP);
  };
  return (
    <div className={styles.login}>
      <div className={styles.title}>
        <h2>KKNUT</h2>
      </div>
      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="아이디"
            name="id"
            value={id}
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="비밀번호"
            name="pw"
            value={pw}
            onChange={onChange}
          />
          <button>로그인</button>
          <div className={styles.sub}>
            <span onClick={onClickSignup}>회원가입</span>|
            <span>아이디/비밀번호 찾기</span>
          </div>
        </form>
      </div>
      <div className={styles.social}>
        <button id="kakao">카카오로 간편 로그인</button>
        <button id="naver">네이버로 간편 로그인</button>
      </div>
    </div>
  );
};

export default Login;
