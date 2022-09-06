import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Login/_login.module.scss";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
}

const VISIBILITY_ON = <span className="material-icons">visibility</span>;
const VISIBILITY_OFF = <span className="material-icons">visibility_off</span>;

const Login = ({ setCurrLoginState }: Props) => {
  const [input, setInput] = useState({ id: "", pw: "" });
  const { id, pw } = input;
  const [isPwVisi, setIsPwVisi] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // login get
    console.log(input);
  };

  const onClickSignup = () => {
    setCurrLoginState(LOGINSTATE.SIGNUP);
  };

  const onClickVisi = () => {
    setIsPwVisi((prev) => !prev);
  };
  return (
    <div className={styles.login}>
      <div className={styles.title}>
        <h2>KKNUT</h2>
      </div>
      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.input_wrapper}>
            <input
              type="text"
              id="id"
              placeholder=" "
              name="id"
              value={id}
              onChange={onChange}
            />
            <label htmlFor="id">아이디</label>
          </div>
          <div className={styles.input_wrapper}>
            <input
              type={isPwVisi ? "text" : "password"}
              id="pw"
              placeholder=" "
              name="pw"
              value={pw}
              onChange={onChange}
            />
            <label htmlFor="pw">비밀번호</label>
            <div className={styles.visi_icon} onClick={onClickVisi}>
              {isPwVisi ? VISIBILITY_ON : VISIBILITY_OFF}
            </div>
          </div>
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
