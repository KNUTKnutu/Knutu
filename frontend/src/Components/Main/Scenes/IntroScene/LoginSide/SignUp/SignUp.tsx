import { ChangeEvent, FormEvent, useState } from "react";
import {
  CONFIRM_PW,
  EMAIL,
  ID,
  LOGIN,
  NAME,
  PW,
  SINGNUP,
  TITLE,
} from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Signup/_signup.module.scss";
import { post__signup } from "../../../../../../Logic/API/POST/post";
import { RegexId, RegexPw, RegexName, RegexEmail } from "../../../../../../Logic/Regex/regex";

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
    email: "",
  });
  const { id, pw, confirm_pw, name, email } = input;
  const [isPwVisi, setIsPwVisi] = useState(false);
  const [isPwCVisi, setIsPwCVisi] = useState(false);

  const [, setValidId] = useState<boolean>(false);
  const [, setValidPw] = useState<boolean>(false);
  const [, setValidConfirmPw] = useState<boolean>(false);
  const [, setValidName] = useState<boolean>(false);
  const [, setValidEmail] = useState<boolean>(false);

  // 민경호 TODO: 비밀번호 해싱 => SHA256

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setValidId(RegexId.test(id));
    setValidPw(RegexPw.test(pw));
    setValidConfirmPw(RegexPw.test(confirm_pw) && confirm_pw == pw);
    setValidName(RegexName.test(name));
    setValidEmail(RegexEmail.test(email));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    post__signup({ id, pw, name, email });
    setCurrLoginState(LOGINSTATE.LOGIN);
  };

  const onClickLogin = () => {
    setCurrLoginState(LOGINSTATE.LOGIN);
  };

  const onClickFind = () => {
    setCurrLoginState(LOGINSTATE.FIND);
  };

  const onClickVisi = () => {
    setIsPwVisi((prev) => !prev);
  };

  const onClickPwCVisi = () => {
    setIsPwCVisi((prev) => !prev);
  };

  // check Input logic * * *

  const checkInput = (str : any) => {
    if (str === undefined || str === null || str === "" || str === false) {
      return false;
    } else {
      return true;
    }
  }


  return (
    <div className={styles.signup}>
      <div className={styles.title}>
        <h2>{TITLE}</h2>
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
              className={RegexId.test(id) && checkInput(id) ? styles.correctRegex : styles.wrongRegex}
            />
            <label htmlFor="id">{ID}</label>
          </div>
          <div className={styles.input_wrapper}>
            <input
              type={isPwVisi ? "text" : "password"}
              id="pw"
              placeholder=" "
              name="pw"
              value={pw}
              onChange={onChange}
              className={RegexPw.test(pw) && checkInput(pw) ? styles.correctRegex : styles.wrongRegex}
            />
            <label htmlFor="pw">{PW}</label>
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
              className={RegexPw.test(confirm_pw) && confirm_pw == pw && checkInput(confirm_pw) ? styles.correctRegex : styles.wrongRegex}
            />
            <label htmlFor="confirm_pw">{CONFIRM_PW}</label>
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
              className={RegexName.test(name) && checkInput(name) ? styles.correctRegex : styles.wrongRegex}
            />
            <label htmlFor="name">{NAME}</label>
          </div>
          <div className={styles.input_wrapper}>
            <input
              type="email"
              id="email"
              placeholder=" "
              name="email"
              value={email}
              onChange={onChange}
              className={RegexEmail.test(email) && checkInput(email) ? styles.correctRegex : styles.wrongRegex}
            />
            <label htmlFor="email">{EMAIL}</label>
          </div>
          <button>{SINGNUP}</button>
          <div className={styles.sub}>
            <span onClick={onClickLogin}>{LOGIN}</span>
            <span onClick={onClickFind}>아이디/비밀번호 찾기</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
