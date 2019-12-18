import React from "react";
import { NavLink, Link } from "react-router-dom";
import banner from "../../images/banner.jpg";
import "../css/styles.css";

const Reset = () => {
  return (
    <div>
      <header>
        <span className="form-logo">Beipro</span>

        <nav className="main-nav">
          <ul className="nav">
            <li>
              <NavLink to="/">Login</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div id="main-div" className="ring">
          <form id="left">
            <div>
              <span className="form-logo">Beipro</span>
            </div>
            <h2>Password Reset</h2>
            <p>
              Enter your Email address below and we&apos;ll send you a link to reset your password
            </p>

            <div>
              <input type="text" placeholder="Enter Email Address" />
            </div>

            <div>
              <button className="btn-welcome" type="button">
                Reset Password
              </button>
            </div>

            <div>
              <p>Already have an account?</p>
              <span>
                <Link to="/">SignIn</Link>
                or
                <Link to="/register">Sign Up</Link>
              </span>
            </div>
          </form>
          <img id="right" src={banner} alt="technology" />
        </div>
      </main>

      <footer className="footer-register">
        <span>Beipro &copy;2018</span>
      </footer>
    </div>
  );
};
export default Reset;
