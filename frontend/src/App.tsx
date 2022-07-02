import "./App.css";
import IntroScene from "./Scenes/IntroScene/IntroScene";
import LobbyScene from "./Scenes/LobbyScene/LobbyScene";
import GameScene from "./Scenes/GameScene/GameScene";

const App: React.FC = () => {
  return (
    <div className="App">
      <header></header>
      <main>
        <IntroScene />
        <LobbyScene />
        <GameScene />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
