import { useState, useEffect } from 'react';
import styles from "../../styles/Components/Footer/_footer.module.scss";

const Footer = (): JSX.Element => {
  const [clockText, setClockText]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>("");

  useEffect(() => {
    setInterval(() => {
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
  const dateString = date.toLocaleString("ko-KR", {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hourCycle: 'h24',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const replacedString = dateString.replace(/(\d{4})\. (\d{2})\. (\d{2})\. (\d{2}):(\d{2}):(\d{2})/, '$1년 $2월 $3일 $4시 $5분 $6초');

  return replacedString;
}

export default Footer;