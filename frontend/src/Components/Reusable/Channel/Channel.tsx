import styles from "../../../Styles/Components/Reusable/Channel/_channel.module.scss";
import { ChannelProps, User, Users } from "../../../interface";
import { useRecoilState, useRecoilStoreID, useRecoilValue, useSetRecoilState } from "recoil";
import { currentSceneState, usersState, userState } from "../../../Recoil/atom";
import { SCENE__LOBBYSCENE } from "../../../constant";
import { put__enterChannel } from "../../../Logic/API/PUT/put";
import { AxiosError } from "axios";

// 최대 400명으로 제한을 둠.

// bar관련 주석
// 0 ~ 20: 게임이 잘 안되는 유저 수 -> 검은색
// 21 ~ 50: 게임이 잡히긴 할 것 같은 유저 수 -> 파란색
// 51 ~ 300: 게임이 잘 잡히는 유저 수 -> 초록색
// 301 ~ 350: 혼잡 -> 노란색
// 351 ~ 400: 복잡 -> 빨간색

const total = 400;

// 민경호 TODO: Scene을 바꾸는 동안에는, Main부는 클릭이 걸려선 안 됨.
const Channel = ({ name, visitor }: ChannelProps) => {
  // const setCurrentScene = useSetRecoilState(currentSceneState);
  // const onClickChannel = () => {
  //   setCurrentScene(SCENE__LOBBYSCENE);
  // };
  const bar_length: number = visitor === 0 ? 1 / total : visitor / total;
  const bar_color = (visitor: number) => {
    if (visitor <= 20) return "black";
    else if (visitor <= 50) return "#0288d1";
    else if (visitor <= 300) return "#388e3c";
    else if (visitor <= 350) return "#f9a825";
    else return "#c62828";
  };
  
  const setCurrentScene = useSetRecoilState(currentSceneState);
  const setUsersOnChannel = useSetRecoilState<Users>(usersState);
  const usersOnChannel = useRecoilValue<Users>(usersState);
    
  const [user, _] = useRecoilState(userState);

  const onChannelClicked = async () => {
    const channelName = name;

    const res = await put__enterChannel({user, channelName});

    if(res !== null && !(res instanceof AxiosError)) {
      setCurrentScene(SCENE__LOBBYSCENE);
      
      const users = Object.values(res.data.onlineUsers);
      const sortedUsers: any = users.sort((a: any, b: any) => {
        return b.level - a.level;
      });
      
      setUsersOnChannel(sortedUsers);
    }
    else {
      window.alert("채널에 입장할 수 없습니다. 다시 시도해주세요.");
    }
  }

  return (
    <div className={styles.channel_wrapper} onClick={onChannelClicked}>
      <div className={styles.channel_main}>
        <span className={styles.left}>{name}</span>
        <div className={styles.right}>
          <span>{visitor}/400</span>
          <span className={`material-icons ${styles.enter_icon}`}>
            arrow_forward
          </span>
        </div>
      </div>
      <div
        className={styles.bar}
        style={{
          width: `${bar_length * 100}%`,
          backgroundColor: bar_color(visitor),
        }}
      ></div>
    </div>
  );
};

export default Channel;
