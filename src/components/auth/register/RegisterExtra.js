import React from "react";
import { NavLink } from "react-router-dom";

const RegisterExtra = () => {
  return (
    <>
      <div className="col text-right">
        <p>
          Already have an account?{" "}
          <span className="create-account">
            <NavLink to="/">Sign in</NavLink>
          </span>
        </p>
      </div>
    </>
  );
};
export default RegisterExtra;
