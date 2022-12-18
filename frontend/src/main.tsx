import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import Splash from "./Components/Suspense/Splash";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);
