import { useRecoilValue } from "recoil";
import { ChannelSideProps } from "../../../../../interface";
import { userState } from "../../../../../Recoil/atom";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/ChannelSide/_channelSide.module.scss";
import Channel from "../../../../Reusable/Channel/Channel";

// fetch된 채널 리스트를 보여주는 컴포넌트
const ChannelSide = ({ list }: ChannelSideProps) => {
  const user = useRecoilValue(userState);
  return (
    <div className={styles.channel_side_container}>
      <div
        className={`${styles.channel_container} ${
          user === null && styles.nope
        }`}
      >
        <span>채널 선택</span>
        <hr />
        <div className={styles.channel_list_wrapper}>
          {list.map((channel, idx) => (
            <Channel key={idx} {...channel} />
          ))}
        </div>
      </div>
      {user === null && (
        <div className={styles.alert_channel}>
          <span>로그인을 하면 채널을 볼 수 있습니다.</span>
        </div>
      )}
    </div>
  );
};

export default ChannelSide;
