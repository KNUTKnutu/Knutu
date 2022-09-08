import { useEffect, useState } from "react";
import { LOGINSTATE } from "../../../../../enum";
import { Player } from "../../../../../interface";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/_loginSide.module.scss";
import Find from "./Find/Find";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Signup from "./Signup/Signup";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../../Recoil/atom";
import { DummyPlayer } from "../../../../../dummy";

const LoginSide = () => {
  const user = useRecoilValue(userState);
  const [currLoginState, setCurrLoginState] = useState(
    user ? LOGINSTATE.PROFILE : LOGINSTATE.LOGIN
  );

  // localStorage.clear();

  const condi_render = (currLoginState: LOGINSTATE) => {
    switch (currLoginState) {
      case LOGINSTATE.LOGIN:
        return <Login setCurrLoginState={setCurrLoginState} />;
      case LOGINSTATE.SIGNUP:
        return <Signup setCurrLoginState={setCurrLoginState} />;
      case LOGINSTATE.FIND:
        return <Find />;
      case LOGINSTATE.PROFILE:
        return (
          <Profile setCurrLoginState={setCurrLoginState} {...DummyPlayer} />
        );
    }
  };

  return (
    <div className={styles.login_side}>{condi_render(currLoginState)}</div>
  );
};

export default LoginSide;
