import styles from "./App.module.scss";
import Splash from "./Components/Suspense/Splash";
import { Suspense } from "react";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// const socket = io(`http://localhost:8080`);
// socket.emit("Test", { Classes: "Test", Text: "Testing now" });

const App = () => {
  return (
    <div className={styles.App}>
      <Suspense fallback={<Splash />}>
        <Header />
        <Main />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
