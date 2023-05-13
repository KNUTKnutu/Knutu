import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentSceneState,
  fallState,
  isGameInProgress,
  InactiveAnimationState,
} from "../../../Recoil/atom";
import styles from "../../../styles/Components/Reusable/Animation/_fall.module.scss";
import { SCENESTATE } from "../../../enum";
import {
  SCENE__LOBBYSCENE,
  SCENE__FALL,
  SCENE__INTROSCENE,
  SCENE__GAMESCENE,
} from "../../../constant";

const FallAniPage = () => {
  const [visible, setVisible] = useState(false);
  const currentScene = useRecoilValue<string>(currentSceneState);
  const isGaming = useRecoilValue(isGameInProgress);

  /* 애니메이션 활동상태와 종료상태 둘로 나누어
    Active  Inactive    Animation
    True    True        true
    True    False       true
    False   True        false
    False   False       true */
  const aniActive = useRecoilValue<Boolean>(fallState);
  const [aniInactive, setInactive] = useRecoilState<Boolean>(
    InactiveAnimationState
  );

  /** 애니메이션이 작동 중인지 아니면 끝났는지 감시 */
  const animationStart = () => {
    setInactive(false);
  };
  const animationEnd = () => {
    setInactive(true);
  };

  let class__scene__fall = "";

  switch (currentScene) {
    case SCENE__INTROSCENE:
      class__scene__fall = SCENE__FALL[SCENESTATE.SCENE__INTROSCENE];
      break;
    case SCENE__LOBBYSCENE:
      class__scene__fall = SCENE__FALL[SCENESTATE.SCENE__LOBBYSCENE];
      break;
    case SCENE__GAMESCENE:
      class__scene__fall = SCENE__FALL[SCENESTATE.SCENE__GAMESCENE];
      break;
  }

  // mount시 animation 이 보이지 않게 opacity: 0 을 부여
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  let clouds = [];

  for (let i = 0; i < 36; i++) {
    clouds.push(<div key={i} className={styles[class__scene__fall]}></div>);
  }

  return (
    <div
      className={`${visible ? styles.visiable : styles.unvisiable} ${
        aniActive ? styles.appear : styles.disappear
      }`}
      onAnimationStart={animationStart}
      onAnimationEnd={animationEnd}
    >
      {clouds}
    </div>
  );
};

export default FallAniPage;