import React from "react";
import { NavLink } from "react-router-dom";

const ResetExtra = () => {
  return (
    <>
      <div className="col text-right input-font">
        <p>
          Have an account?{" "}
          <span className="create-account input-font">
            <NavLink to="/">Sign-in</NavLink>
          </span>
        </p>
      </div>
    </>
  );
};
export default ResetExtra;
