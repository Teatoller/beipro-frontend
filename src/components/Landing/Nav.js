import React from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css";
import Dropdown from "../Menu/Dropdown";
import Logout from "../Auth/Logout";

const Nav = () => {

  return (
    <div>
      <header className="header">
        <NavLink to="/" className="logo">
          Beipro
        </NavLink>
        <div className="header-right">
          <Logout />
        </div>
      </header>
      <div>
        <Dropdown />
      </div>
    </div>
  );
};

export default Nav;
