import "./App.css";
import Splash from "./Components/Suspense/Splash";
import React, { Suspense } from "react";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { io } from "socket.io-client";

// const socket = io(`http://localhost:8080`);
// socket.emit("Test", { Classes: "Test", Text: "Testing now" });

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<Splash />}>
        <Header />
        <Main />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
