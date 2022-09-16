import { useEffect, useState } from "react";
import { LOGINSTATE } from "../../../../../enum";
import { Player } from "../../../../../interface";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/_loginSide.module.scss";
import Find from "./Find/Find";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Signup from "./SignUp/SignUp";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../../Recoil/atom";

const LoginSide = () => {
  const user = useRecoilValue(userState);
  const [currLoginState, setCurrLoginState] = useState(
    user ? LOGINSTATE.PROFILE : LOGINSTATE.LOGIN
  );

  useEffect(() => {
    setCurrLoginState(user ? LOGINSTATE.PROFILE : LOGINSTATE.LOGIN);
    console.log(user, currLoginState);
  }, [user]);

  const condi_render = (currLoginState: LOGINSTATE) => {
    switch (currLoginState) {
      case LOGINSTATE.LOGIN:
        return <Login setCurrLoginState={setCurrLoginState} />;
      case LOGINSTATE.SIGNUP:
        return <Signup setCurrLoginState={setCurrLoginState} />;
      case LOGINSTATE.FIND:
        return <Find setCurrLoginState={setCurrLoginState} />;
      case LOGINSTATE.PROFILE:
        return <Profile setCurrLoginState={setCurrLoginState} user={user} />;
    }
  };

  return (
    <div className={styles.login_side}>{condi_render(currLoginState)}</div>
  );
};

export default LoginSide;
