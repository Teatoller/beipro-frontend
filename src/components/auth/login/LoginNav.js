import React from "react";
import { NavLink } from "react-router-dom";
import BeiproHeader from "./BeiproHeader";

const LoginNav = () => {
  return (
    <nav className="header">
      {/* <NavLink to="/" className="logo">
        Beipro
      </NavLink> */}
      <BeiproHeader />
      <div className="header-right signdisp">
        <NavLink to="/register">Sign-up</NavLink>
      </div>
    </nav>
  );
};
export default LoginNav;
