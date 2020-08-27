import React from "react";
import { NavLink } from "react-router-dom";

const RegisterExtra = () => {
  return (
    <>
      <div className="col text-right">
        <p>
          <small> Already have an account? </small>
          <span>
            <NavLink to="/login">Sign-in</NavLink>
          </span>
        </p>
      </div>
    </>
  );
};
export default RegisterExtra;
