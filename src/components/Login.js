import React from "react";
import { NavLink, Link } from "react-router-dom";

import banner from "../images/banner.jpg";
import "./css/styles.css";

const Login = () => {
  return (
    <div>
      <header>
        <span className="form-logo">Beipro</span>

        <nav className="main-nav">
          <ul className="nav">
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div id="main-div">
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
            <div>
              <button className="btn-welcome" type="button">
                Login
              </button>
            </div>
            <div>
              <p>
                Forgot
                <Link to="/reset"> Password</Link>
              </p>
            </div>
            <div>
              <p>Do not have an account?</p>
              <span className="create-account">
                <Link to="/register">Create Account</Link>
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
