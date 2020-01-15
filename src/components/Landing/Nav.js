import React from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css";
import Dropdown from "../Menu/Dropdown";

const Nav = () => {
  return (
    <div>
      <header className="header">
        <NavLink to="/" className="logo">
          Beipro
        </NavLink>
        {/* <div className="header-right">
          <NavLink className="active" to="/">
            Logout
          </NavLink>
        </div> */}
      </header>
      <div>
        {/* <NavLink className="land-links" to="/depots">
          Depot prices
        </NavLink> */}
        <Dropdown />
      </div>
    </div>
  );
};
export default Nav;
