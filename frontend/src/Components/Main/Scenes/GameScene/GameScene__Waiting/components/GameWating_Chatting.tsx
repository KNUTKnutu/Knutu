import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import { useEffect, useRef, useState } from "react";
import GameWating_Chat from "./GameWating_Chat";
import { useRecoilValue } from "recoil";
import { enteredRoomState, userState } from "../../../../../../Recoil/atom";
import KnutuWebSocketHandler from "../../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";

const GameWating_Chatting = () => {

  const room = useRecoilValue(enteredRoomState);
  const user = useRecoilValue(userState);

  const [mode, setMode] = useState("전체");
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [newMessageActive, setNewMessageActive] = useState(false);

  const chatScreenRef = useRef<HTMLDivElement>(null);

  const onClickMode = (): void => {
    if (mode === "전체") setMode("귓속말");
    if (mode === "귓속말") setMode("전체");
  };

  const onChatChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setChat(e.target.value);
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

  // const onNewMessageClicked = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   setNewMessageActive(false);
  //   const {current} = chatScreenRef;
  //   if(current === null) return;
  //   current.scrollTop = current.scrollHeight;
  // }

  useEffect(() => {
    if(chats?.length !== room?.chats?.length) {
      setChats(room.chats);
    }
  }, [room]);

  useEffect(() => {
    const {current} = chatScreenRef;
    if(current) {
      const {scrollTop, scrollHeight, clientHeight} = current;
      if(scrollTop + clientHeight + 26 === scrollHeight) {
        current.scrollTop = scrollHeight;
      } else {
        // setNewMessageActive(chats?.length > 7);
      }
    }
  }, [chats])

  const chatsList = chats?.map((chat) => {
    return <GameWating_Chat key={Math.random()} chatInfo={chat} />
  });

  return (
    <div className={styles.wating_chatting}>
      <div className={styles.game_wating_chatting__body}>
        <div className={styles.game_wating_chatting__chattingScreen} ref={chatScreenRef}>
          {chatsList}
          <div 
            className={`${styles.new_message} ${newMessageActive && styles.active}`} 
            // onClick={(e) => onNewMessageClicked(e)}
            >
              ▼ 새 메시지
            </div>
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
              onKeyDown={(e) => onKeyDown(e)}
              value={chat}
            ></textarea>
          </div>
          <div
            className={styles.game_wating_chatting__chattingBar__send}
            onClick={(e) => sendChat(e)}
          >
            전송
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWating_Chatting;
