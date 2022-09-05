import { useRecoilValue } from "recoil";
import { ChannelSideProps } from "../../../../../interface";
import { userState } from "../../../../../Recoil/atom";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/ChannelSide/_channelSide.module.scss";
import Channel from "../../../../Reusable/Channel/Channel";
import OneButton from "../../../../Reusable/Popup/Simple/OneButton";

// fetch된 채널 리스트를 보여주는 컴포넌트
const ChannelSide = ({ list }: ChannelSideProps) => {
  // const isLogin = useRecoilValue(userState);
  const isLogin = false;
  console.log(isLogin);
  return (
    <div className={styles.channel_side} id="channel_side">
      <div className={`${styles.channel_main} ${!isLogin && styles.yet}`}>
        <div className={styles.title}>
          <h2>채널 선택</h2>
        </div>
        <div className={styles.channels}>
          {list.map((channel, idx) => (
            <Channel key={idx} {...channel} />
          ))}
        </div>
      </div>
      {!isLogin && (
        <div className={styles.modal_container}>
          <div className={styles.glass_panel}>
            <span>로그인하면 </span>
            <span>채널 목록을 볼 수 있습니다!!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelSide;
