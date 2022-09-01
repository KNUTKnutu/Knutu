import styles from "../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";

interface ChatInfoInterface {
    chatInfo: {
      chatter: string;
      chatMessage: string;
      chatTime: string;
    };
  }
  
  const GameGamming_Chat = ({ chatInfo }: ChatInfoInterface) => {
    return (
      <div className={styles.game_gamming_chatting_chat}>
        <span className={styles.game_gamming_chatting_chatter}>
          {chatInfo.chatter}
        </span>
        <span className={styles.game_gamming_chatting_chatMessage}>
          {chatInfo.chatMessage}
        </span>
        <span className={styles.game_gamming_chatting_chatTime}>
          {chatInfo.chatTime.toString()}
        </span>
      </div>
    );
  };

  export default GameGamming_Chat