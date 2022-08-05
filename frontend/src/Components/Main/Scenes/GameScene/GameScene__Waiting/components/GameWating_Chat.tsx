import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
interface ChatInfoInterface {
  chatInfo: {
    chatter: string;
    chatMessage: string;
    chatTime: string;
  };
}

const GameWating_Chat = ({ chatInfo }: ChatInfoInterface) => {
  return (
    <div className={styles.game_wating_chatting_chat}>
      <span className={styles.game_wating_chatting_chatter}>
        {chatInfo.chatter}
      </span>
      <span className={styles.game_wating_chatting_chatMessage}>
        {chatInfo.chatMessage}
      </span>
      <span className={styles.game_wating_chatting_chatTime}>
        {chatInfo.chatTime.toString()}
      </span>
    </div>
  );
};

export default GameWating_Chat;
