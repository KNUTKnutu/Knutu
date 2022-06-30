import "./App.css";
import IntroScene from "./Scenes/IntroScene/IntroScene";
import LobbyScene from "./Scenes/LobbyScene/LobbyScene";
import GameScene from "./Scenes/GameScene/GameScene";

import TwoButton from "./Components/Popup/TwoButton";
import OneButton from "./Components/Popup/OneButton";

const App: React.FC = () => {
  const onClick = () => {
    console.log("Good!");
  };
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
      <OneButton text="a" buttonText="a" callback={onClick}></OneButton>
      {/* <TwoButton text="a" leftButtonText="a" rightButtonText="b"></TwoButton> */}
    </>
  );
};

export default App;
