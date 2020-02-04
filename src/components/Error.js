import React from "react";
import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="alert alert-danger">
      404 Page Not Found
      {" "}
      <NavLink to="/" className="alert-link">
        Back to login
      </NavLink>
    </div>
  );
};
export default Error404;
