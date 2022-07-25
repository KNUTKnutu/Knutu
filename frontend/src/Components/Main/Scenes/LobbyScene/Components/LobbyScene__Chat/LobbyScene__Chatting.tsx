import { ChangeEventHandler, useState } from "react";
import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import LobbyScene__Chat from "./LobbyScene__Chat";

const LobbyScene__Chatting = (): JSX.Element => {
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

  // Test용
  const testChats = [
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

  // const chatsList = chats.map((chat) => <LobbyScene__Chat chatInfo={chat}/>)
  const chatsList = testChats.map((chat) => (
    <LobbyScene__Chat key={Math.random()} chatInfo={chat} />
  ));

  return (
    <div
      className={`${styles.lobby_scene_chatting} ${styles.lobby_scene_components}`}
    >
      <div className={styles.lobby_scene_chatting__title}>채팅</div>
      <div className={styles.lobby_scene_chatting__body}>
        <div className={styles.lobby_scene_chatting__chattingScreen}>
          {chatsList}
        </div>
        <div className={styles.lobby_scene_chatting__chattingBar}>
          <div
            className={styles.lobby_scene_chatting__chattingBar__mode}
            onClick={onClickMode}
          >
            {mode}
          </div>
          <div
            className={styles.lobby_scene_chatting__chattingBar__chatContainer}
          >
            <textarea
              className={styles.lobby_scene_chatting__chattingBar__chat}
              onChange={onChatChange}
              value={chat}
            ></textarea>
          </div>
          <div
            className={styles.lobby_scene_chatting__chattingBar__send}
            onClick={sendChat}
          >
            전송
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScene__Chatting;
