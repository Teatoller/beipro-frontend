import React from "react";
import { NavLink } from "react-router-dom";

export const ResetExtra = () => {
  return (
    <>
      <div className="col text-right">
        <p>
          Have an account?{" "}
          <span>
            <NavLink to="/">Sign-in</NavLink>
          </span>
        </p>
      </div>
    </>
  );
};
export default ResetExtra;
