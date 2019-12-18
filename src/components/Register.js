import React from "react";
import { NavLink} from "react-router-dom";
import banner from "../images/banner.jpg";
import "./css/styles.css";

const Register = () => {
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
        <div id="main-div">
          <form id="left">
            <div>
              <span classNameName="form-logo">Beipro</span>
            </div>
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
            <div>
              <button className="btn-welcome" type="button">
                Register
              </button>
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
