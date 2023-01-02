import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Splash from "./Components/Suspense/Splash";
import "./index.css";

const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <Suspense fallback={<Splash />}>
      <App />
    </Suspense>
  </RecoilRoot>
);
