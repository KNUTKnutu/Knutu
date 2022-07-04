import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Dim.css";

interface Props {
  children: JSX.Element;
}

const Dim = ({ children }: Props) => {
  const portal = document.getElementById("portal");
  if (portal) portal.style.display = "block";
  return portal && createPortal(<div className="dim">{children}</div>, portal);
};

export default Dim;
