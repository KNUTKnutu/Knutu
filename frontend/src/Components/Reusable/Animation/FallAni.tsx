import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentSceneState,
  fallState,
  isGameInProgress,
  mountOpacity,
} from "../../../Recoil/atom";
import styles from "../../../styles/Components/Reusable/Animation/_fall.module.scss";

/** 렌더링과 동시에 애니메이션이 내려오기 시작해서
 *  게임 로딩 중에는 중앙에 위치
 *  로딩 이후에는 오른쪽 하단으로 쭉 빠지기
 */
const FallAni = () => {
  const fall = useRecoilValue(fallState);
  const [visible, setVisible] = useState(false);
  const currentScene = useRecoilValue(currentSceneState);
  const isGaming = useRecoilValue(isGameInProgress);

  /** 애니메이션이 appear 할 때마다 Scene의 opacity를 0으로 만들기 위함 */
  const setOpacity = useSetRecoilState(mountOpacity);
  setOpacity(!fall)
  let scene_fall = "";

  switch (currentScene) {
    case "LobbyScene":
      scene_fall = "fall_intro";
      break;
    case "GameScene":
      if (isGaming == false) scene_fall = "fall_lobby";
      else scene_fall = "fall_game";
      break;
  }

  // mount시 animation 이 보이지 않게 opacity: 0 을 부여
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`${visible ? styles.visiable : styles.unvisiable} ${
        fall === true ? styles.appear : styles.disappear
      }`}
    >
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
      <div className={styles[scene_fall]}></div>
    </div>
  );
};

export default FallAni;
