import React from "react";
import { NavLink } from "react-router-dom";

export const LoginExtra = () => {
  return (
    <>
      <div className="col-6 text-sm-left">
        <p>
          Forgot?
          <NavLink to="/resetrequest"> Password</NavLink>
        </p>
      </div>
      <div className="col-6 text-sm-right">
        <p>Do not have an account?</p>
        <span className="create-account mb0">
          <NavLink to="/register">Sign-up</NavLink>
        </span>
      </div>
    </>
  );
};
export default LoginExtra;
