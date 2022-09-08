import styles from "../../../Styles/Components/Reusable/Channel/_channel.module.scss";
import { ChannelProps } from "../../../interface";
import { useSetRecoilState } from "recoil";
import { currentSceneState } from "../../../Recoil/atom";
import { SCENE__LOBBYSCENE } from "../../../constant";

// 최대 400명으로 제한을 둠.

// bar관련 주석
// 0 ~ 20: 게임이 잘 안되는 유저 수 -> 검은색
// 21 ~ 50: 게임이 잡히긴 할 것 같은 유저 수 -> 파란색
// 51 ~ 300: 게임이 잘 잡히는 유저 수 -> 초록색
// 301 ~ 350: 혼잡 -> 노란색
// 351 ~ 400: 복잡 -> 빨간색

const total = 400;

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

  return (
    <div className={styles.channel_wrapper}>
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
