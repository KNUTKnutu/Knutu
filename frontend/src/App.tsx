import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import GameScene from "/src/Scenes/GameScene/GameScene";
import IntroScene from "/src/Scenes/IntroScene/IntroScene";
import LobbyScene from "/src/Scenes/LobbyScene/LobbyScene";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header>
      </header>
      <main>
        <GameScene />
        <IntroScene />
        <LobbyScene />
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default App
