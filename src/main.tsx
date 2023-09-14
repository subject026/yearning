import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import WagmiProvider from "./hooks/WagmiProvider.tsx";
import { ConnectedUserProvider } from "./hooks/useConnectedUser.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider>
      <ConnectedUserProvider>
        <App />
      </ConnectedUserProvider>
    </WagmiProvider>
  </React.StrictMode>
);
