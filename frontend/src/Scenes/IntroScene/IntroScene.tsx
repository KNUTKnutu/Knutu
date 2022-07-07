import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentSceneState } from "../../Components/Recoil/atom";
import { SCENE__INTROSCENE } from "../../constant";
import InitApplication from "../../Logic/InitApplication";
import "./IntroScene.css";

// fetch가 완료되면 Suspense안에 컴포넌트들을 보여줌
// initialResource는 각 컴포넌트에서 필요로 하는 데이터들을 가지고 있어야 한다.
// initialResource는 Promise가 아님. Suspense를 위한 객체.
const initialResource = InitApplication();

const IntroScene = (): JSX.Element => {
  const [intro, setIntro] = useState(initialResource.intro.read());
  const { title } = intro;

  const currentScene = useRecoilValue(currentSceneState);

  useEffect(() => {
    const introScene = document.getElementById(SCENE__INTROSCENE);
    if (currentScene === SCENE__INTROSCENE) {
      introScene?.classList.add("active");
    } else if (introScene?.classList.contains("active")) {
      introScene?.classList.add("inactive");
      introScene?.classList.remove("active");
      setTimeout(() => {
        introScene?.classList.remove("inactive");
      }, 2000);
    }
  }, [currentScene]);

  return (
    <div id={SCENE__INTROSCENE} className="scene">
      {SCENE__INTROSCENE}
    </div>
  );
};

export default IntroScene;
