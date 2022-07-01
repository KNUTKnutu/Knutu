import "./App.css";
import IntroScene from "./Scenes/IntroScene/IntroScene";
import LobbyScene from "./Scenes/LobbyScene/LobbyScene";
import GameScene from "./Scenes/GameScene/GameScene";
import Dialog from "./Components/Popup/Dialog/Dialog";
import OneButton from "./Components/Popup/Simple/OneButton";

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
      <Dialog
        main={
          <div style={{ height: "800px" }}>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
          </div>
        }
        callback__OK={() => console.log("Good!")}
      ></Dialog>
    </>
  );
};

export default App;
