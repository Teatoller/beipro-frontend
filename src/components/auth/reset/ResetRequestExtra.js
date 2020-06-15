import React from "react";
import { NavLink } from "react-router-dom";

const ResetRequestExtra = () => {
  return (
    <>
      <div className="col text-right input-font">
        <p>Have an account?</p>
        <span className="create-account input-font">
          <NavLink to="/">Sign in</NavLink>
        </span>
      </div>
    </>
  );
};
export default ResetRequestExtra;
