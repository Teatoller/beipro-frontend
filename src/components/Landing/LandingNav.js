import React from "react";
import { NavLink } from "react-router-dom";

const LandingNav = () => {
  return (
    <nav className="header">
      <NavLink to="/" className="logo">
        Beipro
      </NavLink>
      <span className="header-right signdisp">
        <NavLink to="/login">Sign in</NavLink>
      </span>
      <span className="header-right signdisp">
        <NavLink to="/register">Sign up</NavLink>
      </span>
    </nav>
  );
};
export default LandingNav;
