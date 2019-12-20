import React from "react";
import { NavLink } from "react-router-dom";
import banner from "../../images/banner.jpg";
import "../css/styles.css";

const Login = () => {
  return (
    <div>
      <header className="header">
        <NavLink to="/landing" className="logo">
          Beipro
        </NavLink>
        <div className="header-right">
          <NavLink to="/register">Register</NavLink>
        </div>
      </header>
      <main>
        <div id="main-div" className="ring">
          <form id="left">
            <div>
              <span className="form-logo">Beipro</span>
            </div>
            <div>
              <input type="text" placeholder="Email" />
            </div>
            <div>
              <input type="text" placeholder="Password" />
            </div>
            <div className="login-btn">
              <NavLink to="/landing" className="btn-welcome" type="submit">
                Login
              </NavLink>
            </div>
            <div>
              <p>
                Forgot
                <NavLink to="/reset"> Password</NavLink>
              </p>
            </div>
            <div>
              <p>Do not have an account?</p>
              <span className="create-account">
                <NavLink to="/register">Create Account</NavLink>
              </span>
            </div>
          </form>
          <img id="right" src={banner} alt="technology" />
        </div>
      </main>

      <footer className="footer-login">
        <span>Beipro &copy;2018</span>
      </footer>
    </div>
  );
};
export default Login;
