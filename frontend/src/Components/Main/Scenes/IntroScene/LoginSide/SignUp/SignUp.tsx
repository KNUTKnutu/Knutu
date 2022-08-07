import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import {
  CHECK_PW,
  ID,
  MAINTAIN,
  NAME,
  PW,
  SINGNUP,
} from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import { FloatingLabelProps } from "../../../../../../interface";
import { post__signup } from "../../../../../../Logic/API/POST/post";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/SignUp/_signup.module.scss";
import FloatingLabel from "../../../../../Reusable/FloatingLabel/FloatingLabel";

interface SignUpProps {
  setLoginState: React.Dispatch<SetStateAction<LOGINSTATE>>;
}

const SignUp = ({ setLoginState }: SignUpProps) => {
  const [signup, setSignup] = useState({
    id: "",
    pw: "",
    pw_check: "",
    name: "",
  });
  const { id, pw, pw_check, name } = signup;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // pw와 pw_check이 동일하다면 post_signup()을 실행한다.
    if (pw === pw_check) {
      post__signup({ id, pw, name });
    }

    // setLoginState(LOGINSTATE.Before);
  };

  const SIGNUPCONTENTS: FloatingLabelProps[] = [
    {
      type: "text",
      id: "id",
      name: "id",
      value: id,
      onChange: onChange,
      label: "아이디",
    },
    {
      type: "password",
      id: "pw",
      name: "pw",
      value: pw,
      onChange: onChange,
      label: "비밀번호",
    },
    {
      type: "password",
      id: "pw_check",
      name: "pw_check",
      value: pw_check,
      onChange: onChange,
      label: "비밀번호 확인",
    },
    {
      type: "text",
      id: "name",
      name: "name",
      value: name,
      onChange: onChange,
      label: "이름",
    },
  ];

  return (
    <div className={styles.signup_container}>
      <form onSubmit={onSubmit}>
        <div className={styles.signup_head_container}>
          <span className={styles.signup_head}>{SINGNUP}</span>
        </div>
        <hr />
        <div className={styles.signup_submit_container}>
          {SIGNUPCONTENTS.map((content, idx) => (
            <FloatingLabel key={idx} {...content} />
          ))}
          <div className={styles.signup_btn_wrapper}>
            <button>뒤로 가기</button>
            <button>{SINGNUP}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
