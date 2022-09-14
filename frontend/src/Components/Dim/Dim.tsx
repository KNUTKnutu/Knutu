import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "../../Styles/Components/Dim/_dim.module.scss";

interface Props {
  children: JSX.Element;
}
/** Dim은 단순히 children을 id를 가진 엘리먼트의 자식요소로 들여보내주는 역할을 한다. */
const Dim = ({ children }: Props) => {
  const portal = document.getElementById("portal");

  useEffect(() => {
    portal!.style.display = "flex";
    return () => {
      portal!.style.display = "none";
    };
  });
  return (
    portal &&
    createPortal(
      <div className={styles.modal_container}>{children}</div>,
      portal
    )
  );
};

export default Dim;
