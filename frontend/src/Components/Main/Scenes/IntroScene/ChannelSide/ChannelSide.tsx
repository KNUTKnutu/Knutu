import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChannelProps } from "../../../../../interface";
import { getChannelInfos } from "../../../../../Logic/API/GET/get";
import { channelsState, userState } from "../../../../../Recoil/atom";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/ChannelSide/_channelSide.module.scss";
import Channel from "../../../../Reusable/Channel/Channel";

/**
 * 채널 리스트를 보여주는 컴포넌트
 */
const ChannelSide = () => {
  /**
   * 현재 유저가 로그인해있는지를 알기 위한 atom
   * user 값으로 glass_panel이 보일지 아닐지를 결정한다.
   */
  const user = useRecoilValue(userState);

  /**
   * atom에 있는 채널 리스트를 보여주기 위해 가져온 atom
   */
  const channelsList: ChannelProps[] = useRecoilValue(channelsState);

  const setChannels = useSetRecoilState(channelsState);

  useEffect(() => {
    const getChannelInfosForInit = async () => {
      const channels = await getChannelInfos();
      if (channels !== null) {
        const channelsForRecoil = channels.map((val) => {
          const { name, userCount } = val;
          return {
            name,
            userCount,
          };
        });
        setChannels(channelsForRecoil);
      }
      console.log(channels);
    };
    getChannelInfosForInit();
  }, []);

  return (
    <div className={styles.channel_side} id="channel_side">
      <div className={`${styles.channel_main} ${!user && styles.yet}`}>
        <div className={styles.title}>
          <h2>채널 선택</h2>
        </div>
        <div className={styles.channels}>
          {channelsList.map((channel, idx) => (
            <Channel key={idx} {...channel} />
          ))}
        </div>
      </div>
      {!user && (
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
