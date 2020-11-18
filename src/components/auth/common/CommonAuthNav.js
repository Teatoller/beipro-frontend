import React from "react";
import { NavLink } from "react-router-dom";

function CommonAuthNav() {
  const logoUrl = "./img/beipro.svg";
  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        <img
          src={logoUrl}
          width="30"
          height="30"
          className="d-inline-block align-top p-1"
          alt=""
          loading="lazy"
        />
        <span className="font-weight-bold text-secondary">Beipro</span>
      </NavLink>
      <ul className="nav navbar justify-content-end">
        <li className="nav-item">
          <NavLink className="nav-link active p-1" to="/login">
            Sign-in
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default CommonAuthNav;
