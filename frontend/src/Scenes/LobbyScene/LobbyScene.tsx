import { SCENE__LOBBYSCENE } from "../../constant";
import "./LobbyScene.css";

interface Props {
  isActive: boolean;
}

const LobbyScene = ({ isActive }: Props): JSX.Element => {
  return (
    <div id={SCENE__LOBBYSCENE} className={isActive ? "active" : ""}>
      {SCENE__LOBBYSCENE}
    </div>
  );
};

export default LobbyScene;
