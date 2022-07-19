import { createPortal } from "react-dom";
import styles from "../../styles/Components/Dim/_dim.module.scss";

interface Props {
  children: JSX.Element;
}

const Dim = ({ children }: Props) => {
  const portal = document.getElementById("portal");
  return (
    portal &&
    createPortal(<div className={styles.dim_container}>{children}</div>, portal)
  );
};

export default Dim;
