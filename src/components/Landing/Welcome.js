import React from "react";
import "../css/styles.css";

const Welcome = () => {
  return (
    <div>
      <main>
        <div id="main-div">
          {/* <div>
            <h2> </h2>
            <div className="country-select selector">
              <label name="country" Htmlfor={"countrySelect"}>
                Select a Country:
              </label>

              <select style={{ backgroundColor: "lightgray" }} id={"countrySelect"}>
                <option value="">--Please choose a country--</option>
                <option value="kenya">Kenya</option>
                <option value="uganda">Uganda</option>
                <option value="tanzania">Tanzania</option>
                <option value="rwanda">Rwanda</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
              </select>
            </div>

            <div className="location-select selector">
              <label name="location" Htmlfor={"locationSelect"}>
                Select a Region:
              </label>

              <select style={{ backgroundColor: "lightgray" }} id={"locationSelect"}>
                <option value="">--Please choose a region--</option>
                <option value="nairobi">Nairobi</option>
                <option value="mombasa">Mombasa</option>
                <option value="kisumu">Kisumu</option>
                <option value="nakuru">Nakuru</option>
                <option value="eldoret">Eldoret</option>
                <option value="konza">Konza</option>
              </select>
            </div>
          </div> */}
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
export default Welcome;
