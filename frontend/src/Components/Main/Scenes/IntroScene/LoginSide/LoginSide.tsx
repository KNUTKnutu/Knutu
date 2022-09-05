import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/_loginSide.module.scss";
import Find from "./Find/Find";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

const LoginSide = () => {
  return (
    <div className={styles.login_side}>
      <Login />
      {/* <Signup />
      <Find /> */}
    </div>
  );
};

export default LoginSide;
