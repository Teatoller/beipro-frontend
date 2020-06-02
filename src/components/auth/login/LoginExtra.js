import React from "react";
import { NavLink } from "react-router-dom";

const LoginExtra = () => {
  return (
    <>
      <div className="col-6 text-left">
        <p>
          Forgot?
          <NavLink to="/resetrequest"> Password</NavLink>
        </p>
      </div>
      <div className="col-6 text-right">
        <p>Do not have an account?</p>
        <span className="create-account">
          <NavLink to="/register">Sign up</NavLink>
        </span>
      </div>
    </>
  );
};
export default LoginExtra;
