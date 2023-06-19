import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
interface ChatInfoInterface {
  chatInfo: {
    sender: string;
    message: string;
    timestamp: number;
  };
}

const GameWating_Chat = ({ chatInfo }: ChatInfoInterface) => {

  const getDisplayTimeStamp = (_timestamp: number): string => {
    return new Date(_timestamp).toLocaleTimeString();
  }

  return (
    <div className={styles.game_wating_chatting_chat}>
      <span className={styles.game_wating_chatting_chatter}>
        {chatInfo.sender}
      </span>
      <span className={styles.game_wating_chatting_chatMessage}>
        {chatInfo.message}
      </span>
      <span className={styles.game_wating_chatting_chatTime}>
        {getDisplayTimeStamp(chatInfo.timestamp)}
      </span>
    </div>
  );
};

export default GameWating_Chat;
