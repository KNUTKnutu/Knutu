import { SCENE__GAMESCENE } from "../../constant";
import "./GameScene.css";

interface Props {
  isActiveGame: boolean;
}

const GameScene = ({ isActiveGame }: Props): JSX.Element => {
  return (
    <div id={SCENE__GAMESCENE} className={`${isActiveGame && "active"}`}>
      {SCENE__GAMESCENE}
    </div>
  );
};

export default GameScene;
