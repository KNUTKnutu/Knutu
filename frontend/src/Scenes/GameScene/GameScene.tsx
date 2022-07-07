import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentSceneState } from "../../Components/Recoil/atom";
import { SCENE__GAMESCENE } from "../../constant";
import "./GameScene.css";

const GameScene = (): JSX.Element => {
  const currentScene = useRecoilValue(currentSceneState);

  useEffect(() => {
    const gameScene = document.getElementById(SCENE__GAMESCENE);
    if (currentScene === SCENE__GAMESCENE) {
      gameScene?.classList.add("active");
    } else if (gameScene?.classList.contains("active")) {
      gameScene?.classList.add("inactive");
      gameScene?.classList.remove("active");
      setTimeout(() => {
        gameScene?.classList.remove("inactive");
      }, 2000);
    }
  }, [currentScene]);

  return (
    <div id={SCENE__GAMESCENE} className="scene">
      {SCENE__GAMESCENE}
    </div>
  );
};

export default GameScene;
