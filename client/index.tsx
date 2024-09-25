import React from "react";
import ReactDOM from "react-dom/client";
import App from './src/App';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // TODO: More a NOTE than a TODO. This can cause fetch API to be called twice which means you can end up with double data in storage.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
