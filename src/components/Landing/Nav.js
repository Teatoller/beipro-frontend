import React from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css";

const Nav = () => {
  return (
    <div>
      <header className="header">
        <NavLink to="/landing" className="logo">
          Beipro
        </NavLink>
        <div className="header-right">
          <NavLink className="active" to="/">
            Logout
          </NavLink>
        </div>
      </header>
      <div>
        <NavLink className="land-links" to="/welcome">Welcome</NavLink>
        <NavLink className="land-links" to="/nairobi">Nairobi</NavLink>
        <NavLink className="land-links" to="/kisumu">Kisumu</NavLink>
      </div>
    </div>
  );
};
export default Nav;
