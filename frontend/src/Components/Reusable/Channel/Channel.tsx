import styles from "../../../Styles/Components/Reusable/Channel/_channel.module.scss";
import { ChannelProps } from "../../../interface";
import { useSetRecoilState } from "recoil";
import { currentSceneState } from "../../../Recoil/atom";
import { SCENE__LOBBYSCENE } from "../../../constant";

const Channel = ({ channel_name, current_people }: ChannelProps) => {
  const setCurrentScene = useSetRecoilState(currentSceneState);
  const onClickChannel = () => {
    setCurrentScene(SCENE__LOBBYSCENE);
  };
  return (
    <div className={styles.channel_wrapper} onClick={onClickChannel}>
      <span>{channel_name}</span>
      <span>{current_people}</span>
    </div>
  );
};

export default Channel;
