import { useEffect, useState } from "react";
import { LOGINSTATE } from "../../../../../enum";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/_loginSide.module.scss";
import Find from "./Find/Find";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

const LoginSide = () => {
  const [currLoginState, setCurrLoginState] = useState(LOGINSTATE.LOGIN);

  const condi_render = (currLoginState: LOGINSTATE) => {
    switch (currLoginState) {
      case LOGINSTATE.LOGIN:
        return <Login setCurrLoginState={setCurrLoginState} />;
      case LOGINSTATE.SIGNUP:
        return <Signup setCurrLoginState={setCurrLoginState} />;
      case LOGINSTATE.FIND:
        return <Find />;
    }
  };

  return (
    <div className={styles.login_side}>{condi_render(currLoginState)}</div>
  );
};

export default LoginSide;
