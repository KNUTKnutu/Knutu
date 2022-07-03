import "./App.css";
import IntroScene from "./Scenes/IntroScene/IntroScene";
import LobbyScene from "./Scenes/LobbyScene/LobbyScene";
import GameScene from "./Scenes/GameScene/GameScene";
import { Suspense } from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={suspenseComponent} >
        <header></header>
        <main>
          <IntroScene />
          <LobbyScene />
          <GameScene />
        </main>
        <footer></footer>
      </Suspense>
    </div>
  );
};

export default App;
