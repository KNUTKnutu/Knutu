import { useRecoilState, useRecoilValue } from "recoil";
import { LOGO, SCENE__INTROSCENE, SCENE__LOBBYSCENE } from "../../constant";
import { currentSceneState, userState } from "../../Recoil/atom";
import styles from "../../styles/Components/Header/_header.module.scss";

const Header = () => {

  const [user, setUser] = useRecoilState(userState);
  const [currentScene, setCurrentScene] = useRecoilState(currentSceneState);

  const onLogoutBtnClicked = (): void => {
    setCurrentScene(SCENE__INTROSCENE);
    setUser(null);
  }

  return (
    <header className={styles.header_container}>
      <h1>{LOGO}</h1>
      <button style={{display: user && currentScene == SCENE__LOBBYSCENE ? "block" : "none"}} onClick={onLogoutBtnClicked}>로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃</button>
    </header>
  );
};

export default Header;
