import React from "react";
import { NavLink } from "react-router-dom";

const ResetRequestExtra = () => {
  return (
    <>
      <div className="col text-right">
        <p>Have an account?</p>
        <span>
          <NavLink to="/">Sign-in</NavLink>
        </span>
      </div>
    </>
  );
};
export default ResetRequestExtra;
