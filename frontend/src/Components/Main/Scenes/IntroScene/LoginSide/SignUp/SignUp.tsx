import { ChangeEvent, FormEvent, useState } from "react";
import { LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Signup/_signup.module.scss";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
}

const VISIBILITY_ON = <span className="material-icons">visibility</span>;
const VISIBILITY_OFF = <span className="material-icons">visibility_off</span>;

const Signup = ({ setCurrLoginState }: Props) => {
  const [input, setInput] = useState({
    id: "",
    pw: "",
    confirm_pw: "",
    name: "",
  });
  const { id, pw, confirm_pw, name } = input;
  const [isPwVisi, setIsPwVisi] = useState(false);
  const [isPwCVisi, setIsPwCVisi] = useState(false);

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

  const onClickVisi = () => {
    setIsPwVisi((prev) => !prev);
  };

  const onClickPwCVisi = () => {
    setIsPwCVisi((prev) => !prev);
  };

  return (
    <div className={styles.signup}>
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
          <div className={styles.input_wrapper}>
            <input
              type={isPwCVisi ? "text" : "password"}
              id="confirm_pw"
              placeholder=" "
              name="confirm_pw"
              value={confirm_pw}
              onChange={onChange}
            />
            <label htmlFor="confirm_pw">비밀번호 확인</label>
            <div className={styles.visi_icon} onClick={onClickPwCVisi}>
              {isPwCVisi ? VISIBILITY_ON : VISIBILITY_OFF}
            </div>
          </div>
          <div className={styles.input_wrapper}>
            <input
              type="text"
              id="name"
              placeholder=" "
              name="name"
              value={name}
              onChange={onChange}
            />
            <label htmlFor="name">닉네임</label>
          </div>
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
