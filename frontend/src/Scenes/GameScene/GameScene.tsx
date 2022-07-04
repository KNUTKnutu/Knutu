import { SCENE__GAMESCENE } from "../../constant";
import "./GameScene.css";

interface Props {
  isActive: boolean;
}

const GameScene = ({ isActive }: Props): JSX.Element => {
  return (
    <div id={SCENE__GAMESCENE} className={isActive ? "active" : ""}>
      {SCENE__GAMESCENE}
    </div>
  );
};

export default GameScene;
