import { Fragment, useEffect } from "react";
import { useRecoilValue } from "recoil";
import GameScene from "../../Scenes/GameScene/GameScene";
import IntroScene from "../../Scenes/IntroScene/IntroScene";
import LobbyScene from "../../Scenes/LobbyScene/LobbyScene";
import { sceneStatesState } from "../Recoil/selector";

const Main = () => {
  return (
    <main>
      <IntroScene />
      <LobbyScene />
      <GameScene />
    </main>
  );
};

export default Main;
