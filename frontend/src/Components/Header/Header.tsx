import { useEffect, useState } from "react";
import { get__signin } from "../../Logic/API/GET/get";
import { post__signup } from "../../Logic/API/POST/post";
import Dialog from "../Popup/Dialog/Dialog";
import "./Header.css";

const Header = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const onClickLoginBtn = () => {
    setIsShow(true);
  };

  useEffect(() => {
    const portal = document.getElementById("portal");
    isShow
      ? portal?.classList.add("active")
      : portal?.classList.remove("active");
  }, [isShow]);

  useEffect(() => {
    get__signin({ id: "asd", pw: "zxc" });
    // post__signup({ id: "asd", pw: "zxc", name: "name" });
  });

  return (
    <>
      <header>
        <h1>LOGO</h1>
        <button onClick={onClickLoginBtn}>Login</button>
      </header>
      {isShow && (
        <Dialog
          main={<div>asd</div>}
          callback__OK={() => setIsShow(false)}
          callback__CANCEL={() => setIsShow(false)}
        />
      )}
    </>
  );
};

export default Header;
