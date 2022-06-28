import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import IntroScene from "/src/Scenes/IntroScene/IntroScene";
import LobbyScene from "/src/Scenes/LobbyScene/LobbyScene";
import GameScene from "/src/Scenes/GameScene/GameScene";

const App : React.FC = () => {
  return (
    <div className="App">
      <header>
      </header>
      <main>
        <IntroScene />
        <LobbyScene />
        <GameScene />
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default App;
