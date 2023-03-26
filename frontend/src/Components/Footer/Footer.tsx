import { useState, useEffect } from 'react';
import styles from "../../styles/Components/Footer/_footer.module.scss";

const Footer = (): JSX.Element => {
  const [clockText, setClockText]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockText(getClockText());
    }, 1000);
  }, []);

  return (
    <footer className={styles.footer_container}>
      <span className = {styles.clock}>{clockText}</span>
    </footer>
  );
};

const getClockText = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
}


export default Footer;
