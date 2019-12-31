import React, { Component } from "react";
import "../css/styles.css";

class FrontAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header className="header">
          <a href="/landing" className="logo">
            Beipro
          </a>
          <div className="header-right">
            <a href="#about">Logout</a>
          </div>
        </header>
        <main>
          <div id="main-div">
            <div id="left">
              <h2> </h2>

              <form action="" method="get" className="form-example">
                <fieldset disabled className="front-fieldset">
                  <legend>Front Office</legend>
                  <div className="form-example">
                    <label htmlFor="front office id">
                      Office Id:
                      <input
                        type="integer"
                        name="front office id"
                        id="front office id"
                        value="front_office_id"
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="front-fieldset">
                  <legend>Product Price Input</legend>
                  <div className="form-example">
                    <label htmlFor="diesel">
                      Diesel:
                      <input type="decimal" name="diesel" id="diesel" />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="petrol">
                      Petrol:
                      <input type="decimal" name="petrol" id="petrol" />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="kerosene">
                      Kerosene:
                      <input type="decimal" name="kerosene" id="kerosene" />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="ido">
                      Ido:
                      <input type="decimal" name="ido" id="ido" />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="fuel oil">
                      Fuel Oil:
                      <input type="decimal" name="fuel oil" id="fuel oil" />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="lpg">
                      Lpg:
                      <input type="decimal" name="lpg" id="lpg" />
                    </label>
                  </div>
                  <div>
                    <input type="submit" value="Add" />
                    <input type="submit" value="Edit" />
                  </div>
                </fieldset>
              </form>
            </div>
            <div id="right">
              <h3>---</h3>
            </div>
          </div>
        </main>

        <footer className="footer-register">
          <span>Beipro &copy;2018</span>
        </footer>
      </div>
    );
  }
}
export default FrontAdmin;
