import { FormEvent } from "react";
import { LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Signup/_signup.module.scss";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
}

const Signup = ({ setCurrLoginState }: Props) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  const onClickLogin = () => {
    setCurrLoginState(LOGINSTATE.LOGIN);
  };
  return (
    <div className={styles.signup}>
      <div className={styles.title}>
        <h2>KKNUT</h2>
      </div>
      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <input type="password" placeholder="비밀번호 확인" />
          <input type="text" placeholder="닉네임" />
          <button>회원가입</button>
          <div className={styles.sub}>
            <span onClick={onClickLogin}>로그인</span>|
            <span>아이디/비밀번호 찾기</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
