import React from "react";
import { NavLink } from "react-router-dom";

function CommonAuthNav() {
  return (
    <>
      <nav className="header">
        <NavLink to="/" className="logo">
          Beipro
        </NavLink>
        <div className="header-right signdisp">
          <NavLink to="/login">Sign-in</NavLink>
        </div>
      </nav>
    </>
  );
}
export default CommonAuthNav;
