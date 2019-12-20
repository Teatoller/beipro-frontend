import React from "react";
import { NavLink } from "react-router-dom";
import banner from "../../images/banner.jpg";
import "../css/styles.css";

const Register = () => {
  return (
    <div>
      <header className="header">
        <NavLink to="/landing" className="logo">
          Beipro
        </NavLink>
        <div className="header-right">
          <NavLink to="/">Login</NavLink>
        </div>
      </header>
      <main>
        <div id="main-div" className="ring">
          <form id="left">
            <div>
              <input type="text" placeholder="Firstname" />
            </div>
            <div>
              <input type="text" placeholder="Lastname" />
            </div>
            <div>
              <input type="text" placeholder="Email" />
            </div>
            <div>
              <input type="text" placeholder="Password" />
            </div>
            <div>
              <input type="text" placeholder="Confirm Password" />
            </div>
            <div className="login-btn">
              <NavLink to="/" className="btn-welcome" type="submit">
                Register
              </NavLink>
            </div>

            <div>
              <p>Already have an account?</p>
              <span>
                <NavLink to="/">SignIn</NavLink>
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
export default Register;
