import { createPortal } from "react-dom";
import "./Dim.css";

const Dim = () => {
  const portal = document.getElementById("portal");
  return portal && createPortal(<div className="dim">Dim</div>, portal);
};

export default Dim;
