import { SCENE__LOBBYSCENE } from "../../constant";
import "./LobbyScene.css";

interface Props {
  isActiveLobby: boolean;
}

const LobbyScene = ({ isActiveLobby }: Props): JSX.Element => {
  return (
    <div id={SCENE__LOBBYSCENE} className={`${isActiveLobby && "active"}`}>
      {SCENE__LOBBYSCENE}
    </div>
  );
};

export default LobbyScene;
