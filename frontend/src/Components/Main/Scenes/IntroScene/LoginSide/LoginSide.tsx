import { useState } from "react";
import { LOGINSTATE } from "../../../../../enum";
import After from "./After/After";
import Before from "./Before/Before";
import LoginIng from "./Ing/LoginIng";
import SignUp from "./SignUp/SignUp";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/_loginSide.module.scss";

const LoginSide = () => {
  const [loginState, setLoginState] = useState<LOGINSTATE>(LOGINSTATE.Before);

  const switchComponent = () => {
    switch (loginState) {
      //  1. 로그인 전
      case LOGINSTATE.Before:
        return <Before setLoginState={setLoginState} />;
      // 2. 로그인 버튼 클릭
      case LOGINSTATE.Ing:
        return <LoginIng setLoginState={setLoginState} />;
      // 3. 로그인 후
      case LOGINSTATE.After:
        return <After setLoginState={setLoginState} />;
      // 4. 회원가입 버튼 클릭
      case LOGINSTATE.SignUp:
        return <SignUp setLoginState={setLoginState} />;
    }
  };

  return (
    <div className={styles.login_side}>
      <div className={styles.login_container}>{switchComponent()}</div>
    </div>
  );
};

export default LoginSide;
