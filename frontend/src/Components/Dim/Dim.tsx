import { createPortal } from "react-dom";
import "./Dim.css";

interface Props {
  children: JSX.Element;
}

const Dim = ({ children }: Props) => {
  const portal = document.getElementById("portal");
  return portal && createPortal(<div className="dim">{children}</div>, portal);
};

export default Dim;
