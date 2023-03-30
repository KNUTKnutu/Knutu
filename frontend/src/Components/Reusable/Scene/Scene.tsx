import { useRecoilValue } from "recoil";
import { currentSceneState, mountOpacity } from "../../../Recoil/atom";
import styles from "../../../Styles/Components/Reusable/Scene/_scene.module.scss";

interface SceneProps {
  id: string;
  children: JSX.Element;
}

const Scene = ({ id, children }: SceneProps) => {
  const currentScene = useRecoilValue(currentSceneState);
  const opacity = useRecoilValue(mountOpacity);

  return (
    <>
      <div
        className={`${styles.scene_container} ${
          id === currentScene ? styles.active : styles.inactive
        } ${opacity === true ? styles.visiable : styles.unvisiable}`}
      >
        {children}
      </div>
    </>
  );
};

export default Scene;
