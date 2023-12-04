import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        transition={Flip}
        autoClose={10000}
        hideProgressBar={true}
        theme="colored"
        position={toast.POSITION.TOP_CENTER}
      />
      <App />
    </Provider>
  </React.StrictMode>
);
