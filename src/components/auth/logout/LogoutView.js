import React from "react";
import { NavLink } from "react-router-dom";
import BeiproHeader from "../login/BeiproHeader";

const LogoutView = () => {
  return (
    <>
      <div className="header">
        <BeiproHeader />
      </div>

      <div className="logoutview">
        <p className="logoutQues">
          <b>Log in again?</b>
        </p>
        <div className="logoutviewbtn">
          <span>
            <NavLink className="btn btn-sm btn-success logoutMarg" to="/login">
              Yes
            </NavLink>
            <span>
              <NavLink className="btn btn-sm btn-primary logoutMarg" to="/">
                No
              </NavLink>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};
export default LogoutView;
