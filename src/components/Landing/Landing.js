import React from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css";

const Landing = () => {
  return (
    <div>
      <header>
        <span className="form-logo">Beipro</span>

        <nav className="main-nav">
          <ul className="nav">
            <li>
              <NavLink to="/">Logout</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div id="main-div">
          <div>
            <div className="country-select">
              <label name="country" Htmlfor={"countrySelect"}>
                Select a Country:
              </label>

              <select id={"countrySelect"}>
                <option value="">--Please choose a country--</option>
                <option value="kenya">Kenya</option>
                <option value="uganda">Uganda</option>
                <option value="tanzania">Tanzania</option>
                <option value="rwanda">Rwanda</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
              </select>
            </div>

            <div className="location-select">
              <label name="location" Htmlfor={"locationSelect"}>
                Select a Region:
              </label>

              <select id={"locationSelect"}>
                <option value="">--Please choose a region--</option>
                <option value="nairobi">Nairobi</option>
                <option value="mombasa">Mombasa</option>
                <option value="kisumu">Kisumu</option>
                <option value="nakuru">Nakuru</option>
                <option value="eldoret">Eldoret</option>
                <option value="konza">Konza</option>
              </select>
            </div>
          </div>
        </div>

        <section className="bei-welcome">
          <h2>Welcome to Beipro!</h2>
        </section>
      </main>

      <footer className="footer-register">
        <span>Beipro &copy;2018</span>
      </footer>
    </div>
  );
};
export default Landing;
