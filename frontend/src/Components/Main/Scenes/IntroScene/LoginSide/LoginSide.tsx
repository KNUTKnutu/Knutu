import { useEffect, useState } from "react";
import { LOGINSTATE } from "../../../../../enum";
import After from "./After/After";
import Before from "./Before/Before";
import LoginIng from "./Ing/LoginIng";
import SignUp from "./SignUp/SignUp";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/_loginSide.module.scss";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../../Recoil/atom";

const LoginSide = () => {
  const [loginState, setLoginState] = useState<LOGINSTATE>(LOGINSTATE.Before);
  const user = useRecoilValue(userState);

  useEffect(() => {
    user !== null && setLoginState(LOGINSTATE.After);
    console.log(user);
  }, [user]);

  const conditionalRendering = () => {
    if (user !== null && loginState === LOGINSTATE.After) {
      return <After setLoginState={setLoginState} />;
    } else if (loginState === LOGINSTATE.Before) {
      return <Before setLoginState={setLoginState} />;
    } else if (loginState === LOGINSTATE.Ing) {
      return <LoginIng setLoginState={setLoginState} />;
    } else if (loginState === LOGINSTATE.SignUp) {
      return <SignUp setLoginState={setLoginState} />;
    }
  };

  return (
    <div className={styles.login_side}>
      <div className={styles.login_container}>{conditionalRendering()}</div>
    </div>
  );
};

export default LoginSide;
