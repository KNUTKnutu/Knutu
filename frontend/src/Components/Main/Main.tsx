import { Fragment, useEffect } from "react";
import { useRecoilValue } from "recoil";
import GameScene from "../../Scenes/GameScene/GameScene";
import IntroScene from "../../Scenes/IntroScene/IntroScene";
import LobbyScene from "../../Scenes/LobbyScene/LobbyScene";
import { sceneStatesState } from "../Recoil/selector";

const Main = () => {
  const sceneStates = useRecoilValue(sceneStatesState);
  const { intro, lobby, game } = sceneStates;

  return (
    <main>
      <IntroScene isActive={intro} />
      <LobbyScene isActive={lobby} />
      <GameScene isActive={game} />
    </main>
  );
};

export default Main;
