import { useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../../constant";
import { currentSceneState } from "../Recoil/atom";
import "./Footer.css";

const Footer = () => {
  const setCurrentScene = useSetRecoilState(currentSceneState);

  const onClickSceneBtn = (e: any) => {
    const { target } = e;
    if (target.tagName === "BUTTON") {
      const { innerHTML } = target;
      setCurrentScene(innerHTML);
    }
  };
  return (
    <footer onClick={onClickSceneBtn}>
      <div>
        <button>{SCENE__INTROSCENE}</button>
        <button>{SCENE__LOBBYSCENE}</button>
        <button>{SCENE__GAMESCENE}</button>
      </div>
      <span>Copyright</span>
    </footer>
  );
};

export default Footer;
