import { useState } from "react";
import { SCENE__INTROSCENE } from "../../constant";
import InitApplication from "../../Logic/InitApplication";
import "./IntroScene.css";

interface Props {
  isActiveIntro: boolean;
}

// fetch가 완료되면 Suspense안에 컴포넌트들을 보여줌
// initialResource는 각 컴포넌트에서 필요로 하는 데이터들을 가지고 있어야 한다.
// initialResource는 Promise가 아님. Suspense를 위한 객체.
const initialResource = InitApplication();

const IntroScene = ({ isActiveIntro }: Props): JSX.Element => {
  const [intro, setIntro] = useState(initialResource.intro.read());
  const { title } = intro;
  return (
    <div id={SCENE__INTROSCENE} className={`${isActiveIntro && "active"}`}>
      {SCENE__INTROSCENE}
    </div>
  );
};

export default IntroScene;
