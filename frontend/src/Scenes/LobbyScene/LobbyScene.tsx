import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentSceneState } from "../../Components/Recoil/atom";
import { SCENE__LOBBYSCENE } from "../../constant";
import "./LobbyScene.css";

const LobbyScene = (): JSX.Element => {
  const currentScene = useRecoilValue(currentSceneState);

  useEffect(() => {
    const lobbyScene = document.getElementById(SCENE__LOBBYSCENE);
    if (currentScene === SCENE__LOBBYSCENE) {
      lobbyScene?.classList.add("active");
    } else if (lobbyScene?.classList.contains("active")) {
      lobbyScene?.classList.add("inactive");
      lobbyScene?.classList.remove("active");
      setTimeout(() => {
        lobbyScene?.classList.remove("inactive");
      }, 2000);
    }
  }, [currentScene]);

  return (
    <div id={SCENE__LOBBYSCENE} className="scene">
      {SCENE__LOBBYSCENE}
    </div>
  );
};

export default LobbyScene;
