import { LOGO } from "../../constant";
import styles from "../../styles/Components/Header/_header.module.scss";

const Header = () => {
  return (
    <header className={styles.header_container}>
      <h1>{LOGO}</h1>
    </header>
  );
};

export default Header;
