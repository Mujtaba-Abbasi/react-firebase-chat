import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./app/context/AuthContext.tsx";
import { ChatContextProvider } from "./app/context/ChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
