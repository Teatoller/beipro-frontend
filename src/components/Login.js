import React from "react";
import banner from "../images/banner.jpg";
import "./css/login.css";

const Login = () => {
  return (
    <div>
      <header>
        <span className="form-logo">Beipro</span>

        <nav className="main-nav">
          <ul className="nav">
            <li>
              <a href="#">Register</a>
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
                <a href="#"> Password</a>
              </p>
            </div>
            <div>
              <p>Do not have an account?</p>
              <span className="create-account">
                <a href="#">Create Account</a>
              </span>
            </div>
          </form>
          <img id="right" src={banner} alt="technology" />
        </div>
      </main>

      <footer className="footer">
        <span>Beipro &copy;2018</span>
      </footer>
    </div>
  );
};
export default Login;
