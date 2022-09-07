import { useEffect, useState } from "react";
import { LOGINSTATE } from "../../../../../enum";
import { Player } from "../../../../../interface";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/_loginSide.module.scss";
import Find from "./Find/Find";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Signup from "./Signup/Signup";

import ProPic from "../../../../../Assets/Images/Deokgu/Deokgu3_64x64.jpeg";

const DummyPlayer: Player = {
  name: "TestUser",
  level: 328,
  title: "뉴비 절단기",
  currentExperience: 998300,
  profilePicture: ProPic,
  isAccountgaemaeneo: false,
};

const LoginSide = () => {
  // const [currLoginState, setCurrLoginState] = useState(LOGINSTATE.LOGIN);
  const [currLoginState, setCurrLoginState] = useState(LOGINSTATE.PROFILE);

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
