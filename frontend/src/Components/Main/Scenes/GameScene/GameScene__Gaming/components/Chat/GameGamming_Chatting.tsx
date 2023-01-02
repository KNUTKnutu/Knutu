import { useState } from "react";
import styles from "../../../../../../../styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import GameGamming_Chat from "./GameGamming_Chat";

const GameGamming_Chatting = () => {

    const [chat, setChat] = useState("");
    const [chats, setChats] = useState([]);

    const onChatChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setChat(e.target.value);
      if(chat.length >= 43) setChat(chat.substring(0, 43));
    };
  
    const sendChat = (): void => {
      console.log("??");
      setChat("");
    };
    
    const testChats = [
        {
          chatter: "신이종",
          chatMessage: "민경호 개못하네 ㅋㅋㅋㅋㅋ",
          chatTime: new Date().toLocaleTimeString(),
        },
        {
          chatter: "민경호",
          chatMessage: "ㅇㅅㅇ",
          chatTime: new Date().toLocaleTimeString(),
        },
        {
          chatter: "황여진",
          chatMessage: "기러기토마토스위스인도인별똥별역삼역",
          chatTime: new Date().toLocaleTimeString(),
        },
        {
          chatter: "WHO",
          chatMessage: "테스팅 중",
          chatTime: new Date().toLocaleTimeString(),
        },
        {
          chatter: "허강민",
          chatMessage: "지금 몇시여",
          chatTime: new Date().toLocaleTimeString(),
        },
        {
          chatter: "빙글빙글",
          chatMessage: "돌아가는 짱구의 하루",
          chatTime: new Date().toLocaleTimeString(),
        },
        {
          chatter: "이름뭐로하지",
          chatMessage: "잘 모르겠네",
          chatTime: new Date().toLocaleTimeString(),
        },
      ];
    const chatsList = testChats.map((chat) => (
      <GameGamming_Chat key={Math.random()} chatInfo={chat} />
    ));
  
    return (
      <div className={styles.gamming_chatting}>
        <div className={styles.game_gamming_chatting__body}>
          <div className={styles.game_gamming_chatting__chattingScreen}>
            {chatsList}
          </div>
          <div className={styles.game_gamming_chatting__chattingBar}>
              <textarea
                className={styles.game_gamming_chatting__chattingBar__chat}
                onChange={onChatChange}
                value={chat}
              ></textarea>

            <div
              className={styles.game_gamming_chatting__chattingBar__send}
              onClick={sendChat}
            >
              전송
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default GameGamming_Chatting;