import React from "react";
import ReactDOM from "react-dom/client";

import { Providers } from "./Providers";

// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>,
);
