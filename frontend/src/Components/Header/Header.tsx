import { useRecoilState, useRecoilValue } from "recoil";
import { LOGO, SCENE__INTROSCENE, SCENE__LOBBYSCENE } from "../../constant";
import { put__logOut } from "../../Logic/API/PUT/put";
import { fallState, currentSceneState, userState,InactiveAnimationState } from "../../Recoil/atom";
import styles from "../../styles/Components/Header/_header.module.scss";

const Header = () => {

  const [user, setUser] = useRecoilState(userState);
  const [currentScene, setCurrentScene] = useRecoilState(currentSceneState);
  const [fall, setFall] = useRecoilState(fallState)

  const onLogoutBtnClicked = async (): Promise<void> => {
    const res = await put__logOut(user!.name);
    if(res.status !== 200) {
      window.alert("로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
    setCurrentScene(SCENE__INTROSCENE);
    setUser(null);
  }

  const [aniInactive, setInactive] = useRecoilState(InactiveAnimationState);
  const onAnimationFall = () => {
    aniInactive && setFall(!fall) 
  }

  return (
    <header className={styles.header_container}>
      <h1>{LOGO}</h1>
      <button onClick={onAnimationFall}> 토글 fall </button>
      <button style={{display: user && currentScene == SCENE__LOBBYSCENE ? "block" : "none"}} onClick={onLogoutBtnClicked}>로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃로그아웃</button>
    </header>
  );
};

export default Header;
