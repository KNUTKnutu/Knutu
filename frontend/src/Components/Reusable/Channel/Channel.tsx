import styles from "../../../Styles/Components/Reusable/Channel/_channel.module.scss";
import { ChannelProps, Users } from "../../../interface";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentSceneState,
  fallState,
  usersState,
  userState,
} from "../../../Recoil/atom";
import { SCENE__LOBBYSCENE } from "../../../constant";
import { put__enterChannel } from "../../../Logic/API/PUT/put";
import { AxiosError } from "axios";

// bar관련 주석
// 0 ~ 20: 게임이 잘 안되는 유저 수 -> 검은색
// 21 ~ 50: 게임이 잡히긴 할 것 같은 유저 수 -> 파란색
// 51 ~ 300: 게임이 잘 잡히는 유저 수 -> 초록색
// 301 ~ 350: 혼잡 -> 노란색
// 351 ~ 400: 복잡 -> 빨간색

/**
 * 각 채널에 입장할 수 있는 최대 인원 수
 * 나중에 constant에 저장하면 채널마다 두지 않아도 됨.
 */
const total = 400;

const Channel = ({ name, userCount }: ChannelProps) => {
  /**
   * 현재 접속해 있는 유저들의 수에 따라 색과 길이를 다르게 주기 위한 변수와 함수
   */
  const bar_length: number = userCount === 0 ? 1 / total : userCount / total;
  const bar_color = (userCount: number) => {
    if (userCount <= 20) return "black";
    else if (userCount <= 50) return "#0288d1";
    else if (userCount <= 300) return "#388e3c";
    else if (userCount <= 350) return "#f9a825";
    else return "#c62828";
  };

  /**
   * 채널을 눌렀을 때 채널에 해당하는 LobbyScene으로 이동하게 하기 위한 atom
   */
  const setCurrentScene = useSetRecoilState(currentSceneState);

  /**
   * 채널을 눌렀을 때 채널에 접속해있는 유저들의 목록을 저장할 atom
   */
  const setUsersOnChannel = useSetRecoilState<Users>(usersState);
  const usersOnChannel = useRecoilValue<Users>(usersState);

  /**
   * 현재 유저가 채널에 접속하기 위해 서버에 정보를 보낼 때 필요
   */
  const user = useRecoilValue(userState);

  /**
   * 채널 이동시 애니메이션 시작을 위한 atom
   */
  const setFallScene = useSetRecoilState(fallState);

  const onChannelClicked = async () => {
    const channelName = name;
    setFallScene(true);
    const startTime = performance.now();
    if (user) {
      const res = await put__enterChannel({ user, channelName });
      const endTime = performance.now();
      const loadingTime = endTime - startTime;
      const waitTime = loadingTime > 2000 ? loadingTime : 2000;
      setTimeout(() => setFallScene(false), waitTime);
      if (res !== null && !(res instanceof AxiosError)) {
        setTimeout(() => setCurrentScene(SCENE__LOBBYSCENE), waitTime + 1000);

        const users = Object.values(res.data.onlineUsers);
        const sortedUsers: any = users.sort((a: any, b: any) => {
          return b.level - a.level;
        });

        setUsersOnChannel(sortedUsers);
      } else {
        window.alert("채널에 입장할 수 없습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className={styles.channel_wrapper} onClick={onChannelClicked}>
      <div className={styles.channel_main}>
        <span className={styles.left}>{name}</span>
        <div className={styles.right}>
          <span>{userCount}/400</span>
          <span className={`material-icons ${styles.enter_icon}`}>
            arrow_forward
          </span>
        </div>
      </div>
      <div
        className={styles.bar}
        style={{
          width: `${bar_length * 100}%`,
          backgroundColor: bar_color(userCount),
        }}
      ></div>
    </div>
  );
};

export default Channel;
