import { useEffect, useState } from "react";
import OneButton from "../Popup/Simple/OneButton";
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

  return (
    <>
      <header>
        <h1>LOGO</h1>
        <button onClick={onClickLoginBtn}>Login</button>
      </header>
      {isShow && (
        <OneButton
          text="LOGIN MODAL"
          buttonText="Cancel"
          callback={() => setIsShow(false)}
        />
      )}
    </>
  );
};

export default Header;
