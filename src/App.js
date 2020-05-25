import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeiproRouter from "./Router";

const App = () => {
  return (
    <div>
      <BeiproRouter />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
