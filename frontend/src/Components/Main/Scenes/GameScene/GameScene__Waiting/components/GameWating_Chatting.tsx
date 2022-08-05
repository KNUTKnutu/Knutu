import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import { useState } from "react";
import GameWating_Chat from "./GameWating_Chat";

const GameWating_Chatting = () => {

  const [mode, setMode] = useState("전체");
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);

  const onClickMode = (): void => {
    if (mode === "전체") setMode("귓속말");
    if (mode === "귓속말") setMode("전체");
  };

  const onChatChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    console.log(e.target.value);
    setChat(e.target.value);
  };

  const sendChat = (): void => {
    console.log("??");
    setChat("");
  };
  // testing LobbyScene과 동일
  const testChats = [
      {
        chatter: "허강민",
        chatMessage: "채팅 재밌네",
        chatTime: new Date().toLocaleTimeString(),
      },
      {
        chatter: "허강민",
        chatMessage: "히히 위에 있으면 아무도 모를거야",
        chatTime: new Date().toLocaleTimeString(),
      },
      {
        chatter: "신이종",
        chatMessage: "테스팅 중",
        chatTime: new Date().toLocaleTimeString(),
      },
      {
        chatter: "신이종",
        chatMessage: "테스팅 중",
        chatTime: new Date().toLocaleTimeString(),
      },
      {
        chatter: "신이종",
        chatMessage: "테스팅 중",
        chatTime: new Date().toLocaleTimeString(),
      },
      {
        chatter: "신이종",
        chatMessage: "테스팅 중",
        chatTime: new Date().toLocaleTimeString(),
      },
      {
        chatter: "신이종",
        chatMessage: "테스팅 중",
        chatTime: new Date().toLocaleTimeString(),
      },
    ];
  const chatsList = testChats.map((chat) => (
    <GameWating_Chat key={Math.random()} chatInfo={chat} />
  ));

  return (
    <div className={styles.wating_chatting}>
      <div className={styles.game_wating_chatting__body}>
        <div className={styles.game_wating_chatting__chattingScreen}>
          {chatsList}
        </div>
        <div className={styles.game_wating_chatting__chattingBar}>
          <div
            className={styles.game_wating_chatting__chattingBar__mode}
            onClick={onClickMode}
          >
            {mode}
          </div>
          <div
            className={styles.game_wating_chatting__chattingBar__chatContainer}
          >
            <textarea
              className={styles.game_wating_chatting__chattingBar__chat}
              onChange={onChatChange}
              value={chat}
            ></textarea>
          </div>
          <div
            className={styles.game_wating_chatting__chattingBar__send}
            onClick={sendChat}
          >
            전송
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWating_Chatting;
