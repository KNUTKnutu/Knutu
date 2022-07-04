import { useRecoilValue } from "recoil";
import GameScene from "../../Scenes/GameScene/GameScene";
import IntroScene from "../../Scenes/IntroScene/IntroScene";
import LobbyScene from "../../Scenes/LobbyScene/LobbyScene";
import { isSceneStates } from "../Recoil/selector";

const Main = () => {
  const sceneStates = useRecoilValue(isSceneStates);
  const { isActiveIntro, isActiveLobby, isActiveGame } = sceneStates;
  return (
    <main>
      <IntroScene isActiveIntro={isActiveIntro} />
      <LobbyScene isActiveLobby={isActiveLobby} />
      <GameScene isActiveGame={isActiveGame} />
    </main>
  );
};

export default Main;
