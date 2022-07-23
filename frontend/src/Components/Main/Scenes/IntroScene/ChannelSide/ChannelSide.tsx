import { ChannelSideProps } from "../../../../../interface";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/ChannelSide/_channelSide.module.scss";
import Channel from "../../../../Reusable/Channel/Channel";

// fetch된 채털 리스트를 보여주는 컴포넌트
const ChannelSide = ({ list }: ChannelSideProps) => {
  return (
    <div className={styles.channel_side_container}>
      <div className={styles.channel_container}>
        <span>채널 선택</span>
        <hr />
        <div className={styles.channe_list_wrapper}>
          {list.map((channel, idx) => (
            <Channel key={idx} {...channel} />
          ))}
        </div>
      </div>
      <div className={styles.alert_channel}>
        <span>로그인을 하면 채널을 볼 수 있습니다.</span>
      </div>
    </div>
  );
};

export default ChannelSide;
