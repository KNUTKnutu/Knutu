import { ChangeEvent, FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ID, LOGIN, MAINTAIN, PW, SINGNUP } from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import { FloatingLabelProps, LoginIngProps } from "../../../../../../interface";
import { get__signin } from "../../../../../../Logic/API/GET/get";
import { userState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Ing/_loginIng.module.scss";
import FloatingLabel from "../../../../../Reusable/FloatingLabel/FloatingLabel";

// 로그인하는 컴포넌트, 서버에 get요청을 보냄.
const LoginIng = ({ setLoginState }: LoginIngProps) => {
  const setUser = useSetRecoilState(userState);
  const [login, setLogin] = useState({ id: "", pw: "" });
  const { id, pw } = login;

  const onClickSignUp = () => {
    setLoginState(LOGINSTATE.SignUp);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = get__signin({ id, pw });
    console.log(res);
    // status 코드보고 switch나 if문
    // res보고 localStorage의 userState에 담기
    // res가 localStorage에 담겼다면 setLoginState(LOGINSTATE.After)로 변경
  };

  const LOGINCONTENTS: FloatingLabelProps[] = [
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
  ];

  return (
    <div className={styles.login_ing_container}>
      <form>
        <div className={styles.login_head_container}>
          <span className={styles.login_head}>{LOGIN}</span>
        </div>
        <hr />
        <div className={styles.login_submit_container}>
          {LOGINCONTENTS.map((content, idx) => (
            <FloatingLabel key={idx} {...content} />
          ))}
          <div className={styles.maintain_wrapper}>
            <input type="checkbox" id="maintain" />
            <label htmlFor="maintain">{MAINTAIN}</label>
          </div>
          <div className={styles.login_btn_wrapper}>
            <button onClick={onSubmit}>{LOGIN}</button>
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
