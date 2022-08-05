import GameWating_Chatting from "./components/GameWating_Chatting"
import GameWatingList from "./components/WatingList"
import styles from "../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss"

const GameWatingRight = () => {
  return (
    <div className={styles.wating_right_container}>
      <GameWatingList />
      <GameWating_Chatting />
    </div>
  )
}

export default GameWatingRight