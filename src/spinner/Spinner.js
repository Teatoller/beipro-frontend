import React from "react";
import { SpinnerIcon } from "../components/statics/SpinnerIcon";
import "../components/css/site.css";

export const Spinner = () => {
  return (
    <div className="spinner">
      <SpinnerIcon />
    </div>
  );
};
export default Spinner;
