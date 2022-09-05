import { createPortal } from "react-dom";
import styles from "../../Styles/Components/Dim/_dim.module.scss";

interface Props {
  children: JSX.Element;
  id: string;
}
/** Dim은 단순히 children을 id를 가진 엘리먼트의 자식요소로 들여보내주는 역할을 한다. */
const Dim = ({ children, id }: Props) => {
  const portal = document.getElementById(id);
  return (
    portal &&
    createPortal(
      <div className={styles.modal_container}>{children}</div>,
      portal
    )
  );
};

export default Dim;
