import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import IntroScene from "./Scenes/IntroScene/IntroScene";
import LobbyScene from "./Scenes/LobbyScene/LobbyScene";
import GameScene from "./Scenes/GameScene/GameScene";
import Dim from "./Components/Dim/Dim";

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <header></header>
        <main>
          <IntroScene />
          <LobbyScene />
          <GameScene />
        </main>
        <footer></footer>
      </div>
      <Dim></Dim>
    </>
  );
};

export default App;
