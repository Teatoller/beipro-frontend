import React from "react";
import { NavLink } from "react-router-dom";

const RegisterExtra = () => {
  return (
    <>
      <div className="col text-right  input-font">
        <p>
          Already have an account?{" "}
          <span className="create-account input-font">
            <NavLink to="/">Sign in</NavLink>
          </span>
        </p>
      </div>
    </>
  );
};
export default RegisterExtra;
