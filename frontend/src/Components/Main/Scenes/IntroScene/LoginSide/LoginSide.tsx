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

  return <div className={styles.login_side}></div>;
};

export default LoginSide;
