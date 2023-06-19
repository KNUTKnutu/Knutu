// import { ChangeEventHandler, useState } from "react";
import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import LobbyScene__Chat from "./LobbyScene__Chat";

const LobbyScene__Chatting = (): JSX.Element => {
  const chatsList: any = [].map((chat) => (
    <LobbyScene__Chat
      chatInfo={{ chatter: "", chatMessage: "", chatTime: 20 }}
    />
  ));
  const onClickMode = () => {};
  const mode = "";
  const onChatChange = () => {};
  const chat = "";
  const sendChat = () => {};

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
        <div className={styles.modal_container}>
        <div className={styles.glass_panel}>
          <span>아직은 채팅을</span>
          <span>사용하실 수 없습니다!!</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LobbyScene__Chatting;
