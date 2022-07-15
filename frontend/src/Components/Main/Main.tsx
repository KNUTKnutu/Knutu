import { Fragment } from "react";
import GameScene from "../../Scenes/GameScene/GameScene";
import IntroScene from "../../Scenes/IntroScene/IntroScene";
import LobbyScene from "../../Scenes/LobbyScene/LobbyScene";

const CONTENTS = [<IntroScene />, <LobbyScene />, <GameScene />];

const Main = () => {
  return (
    <main>
      {CONTENTS.map((content, idx) => (
        <Fragment key={idx}>{content}</Fragment>
      ))}
    </main>
  );
};

export default Main;
