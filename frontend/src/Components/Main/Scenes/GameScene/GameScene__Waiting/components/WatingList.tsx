import { useRecoilValue } from "recoil";
import { enteredRoomState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import WatingUser from "./WatingUser";

const WatingList = () => {

  const roomState = useRecoilValue(enteredRoomState);

  console.log(roomState)

  if(roomState?.players == null) return <></>;

  const userlist = roomState.players.map((player) => {
    return <WatingUser key={player.name} userinfo={player} />
  });

  return (
    <div>
      <div className={styles.wating_list}>{userlist}</div>
      <div className={styles.room_owner}>방장</div>
    </div>
  );
};

export default WatingList;
