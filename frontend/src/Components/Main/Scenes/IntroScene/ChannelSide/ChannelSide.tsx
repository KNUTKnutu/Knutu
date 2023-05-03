import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChannelProps, Users } from "../../../../../interface";
import { getChannelInfos } from "../../../../../Logic/API/GET/get";
import { channelsState, currentSceneState, userState, usersState } from "../../../../../Recoil/atom";
import styles from "../../../../../Styles/Components/Main/Scenes/IntroScene/ChannelSide/_channelSide.module.scss";
import Channel from "../../../../Reusable/Channel/Channel";
import { put__enterChannel} from "../../../../../Logic/API/PUT/put";
import { SCENE__LOBBYSCENE } from "../../../../../constant";
import { AxiosError } from "axios";

/**
 * 채널 리스트를 보여주는 컴포넌트
 */
const ChannelSide = () => {
  /**
   * 현재 유저가 로그인해있는지를 알기 위한 atom
   * user 값으로 glass_panel이 보일지 아닐지를 결정한다.
   */
  const user = useRecoilValue(userState);
  const setUsersOnChannel = useSetRecoilState<Users>(usersState);
  const setCurrentScene = useSetRecoilState(currentSceneState);

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
    };
    getChannelInfosForInit();
  }, []);

  const autoButtonClicked = async (): Promise<void> => {
    const channelName: string = "K";

    if (user) {
      const res: any = await put__enterChannel({ user, channelName });

      if (res !== null && !(res instanceof AxiosError)) {
        setCurrentScene(SCENE__LOBBYSCENE);

        const users: any = Object.values(res.data.onlineUsers);
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
    <div className={styles.channel_side} id="channel_side">
      <div className={`${styles.channel_main} ${!user && styles.yet}`}>
        <div className={styles.title}>
          <h2>채널 선택</h2>
          <button className={styles.auto_button} onClick={autoButtonClicked}>Auto Enter</button>
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
