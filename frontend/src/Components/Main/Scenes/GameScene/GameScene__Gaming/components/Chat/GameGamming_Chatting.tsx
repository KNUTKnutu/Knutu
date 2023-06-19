import { useEffect, useState } from "react";
import styles from "../../../../../../../styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import GameGamming_Chat from "./GameGamming_Chat";
import { enteredRoomState, userState } from "../../../../../../../Recoil/atom";
import { useRecoilValue } from "recoil";
import KnutuWebSocketHandler from "../../../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";

const GameGamming_Chatting = () => {

    const room = useRecoilValue(enteredRoomState);
    const user = useRecoilValue(userState);

    const [chat, setChat] = useState("");
    const [chats, setChats] = useState([]);

    const onChatChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setChat(e.target.value);
      if(chat.length >= 43) setChat(chat.substring(0, 43));
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if(!(e && user)) return;
      if(e.key === 'Enter') {
        sendChat(e);
      }
    }
  
    const sendChat = (e?: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if(e) {
        e.preventDefault();
      }
      const payload = KnutuWebSocketHandler.getInstance().wrapPacket("chatSubmitOnGameScene", {
        roomId: room.number,
        chatter: user?.name,
        chatMessage: chat,
        chatTime: new Date().getTime(),
      });
      KnutuWebSocketHandler.getInstance().send("chatSubmitOnGameScene", payload);
      setChat("");
    };
  
    useEffect(() => {
      console.log(room);
      setChats(room.chat);
    }, [room]);

    const chatsList = chats?.map((chat) => (
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
                onChange={(e) => onChatChange(e)}
                onKeyDown={(e) => onKeyDown(e)}
                value={chat}
              ></textarea>

            <div
              className={styles.game_gamming_chatting__chattingBar__send}
              onClick={(e) => sendChat(e)}
            >
              전송
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default GameGamming_Chatting;