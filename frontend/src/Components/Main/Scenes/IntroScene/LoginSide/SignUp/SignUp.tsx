import { ChangeEvent, FormEvent, useState } from "react";
import { LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Signup/_signup.module.scss";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
}

const Signup = ({ setCurrLoginState }: Props) => {
  const [input, setInput] = useState({
    id: "",
    pw: "",
    confirm_pw: "",
    name: "",
  });
  const { id, pw, confirm_pw, name } = input;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
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
          <input
            type="password"
            placeholder="비밀번호 확인"
            name="confirm_pw"
            value={confirm_pw}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="닉네임"
            name="name"
            value={name}
            onChange={onChange}
          />
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
