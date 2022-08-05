import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss"
import GameRoomInfo from "./components/GameRoomInfo";
import UserInfo from "./components/UserInfo";


const GameWatingLeft = () => {
  return (
    <div className={styles.wating_left_container}>
      <GameRoomInfo />
      <UserInfo />
    </div>
  );
};

export default GameWatingLeft;
