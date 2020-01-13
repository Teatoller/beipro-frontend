import React, { Component } from "react";
import axios from "../../axios";
import "../css/styles.css";
import Dropdown from "../Menu/Dropdown";

class FrontAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front_office_id: "",
      diesel: "",
      petrol: "",
      kerosene: "",
      fo: "",
      ido: "",
      lpg: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getOfficeData();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    // eslint-disable-next-line camelcase
    const { front_office_id, diesel, petrol, kerosene, fo, ido, lpg } = this.state;
    e.preventDefault();
    const data = { front_office_id, diesel, petrol, kerosene, fo, ido, lpg };

    axios.post(`/currentprices`, data).then(
      response => {},
      error => {
        console.log(error);
      }
    );
  };

  /**
   * Pseudo code
   *
   * Step 1:
   * Figure out the logged in user email
   *
   * Step 2:
   * Figure out the company front office id using the email and frontadmins endpoint
   *
   * Step 3:
   * Assign to the form front office id input field and keep disabled
   */

  getOfficeData = () => {
    try {
      axios.get(`/frontadmins`, {}).then(response => {
        const frontadminsdata = response.data;
        const loggedUserEmail = localStorage.getItem("email");

        // Array with object containing details of the logged user

        const userArray = frontadminsdata.filter(object => object.email === loggedUserEmail);

        // Object containing detail of logged user
        const userObj = userArray[0];

        // Key
        function frontkey() {
          if (userObj) {
            const frontOfficeId = userObj.front_office_id;

            return frontOfficeId;
          }
        }

        const lockey = parseInt(frontkey(), 10);

        this.setState({ front_office_id: lockey });
      });
    } catch (error) {
      throw error;
    }
  };

  render() {
    // eslint-disable-next-line camelcase
    const { front_office_id } = this.state;

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
            <Dropdown />
            <div id="left">
              <h3>Front Office Admin</h3>

              <form noValidate onSubmit={this.onSubmit}>
                <fieldset disabled className="front-fieldset">
                  <legend>Front Office</legend>
                  <div className="form-ex ample">
                    <label htmlFor="front_office_id">
                      Office Id:
                      <input
                        type="decimal"
                        name="front_office_id"
                        id="front_office_id"
                        style={{ color: "red" }}
                        // eslint-disable-next-line camelcase
                        value={front_office_id}
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="front-fieldset">
                  <legend>Product Price Input</legend>
                  <div className="form-example">
                    <label htmlFor="diesel">
                      Diesel:
                      <input type="decimal" name="diesel" id="diesel" onChange={this.onChange} />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="petrol">
                      Petrol:
                      <input type="decimal" name="petrol" id="petrol" onChange={this.onChange} />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="kerosene">
                      Kerosene:
                      <input
                        type="decimal"
                        name="kerosene"
                        id="kerosene"
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="ido">
                      Ido:
                      <input type="decimal" name="ido" id="ido" onChange={this.onChange} />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="fuel oil">
                      Fuel Oil:
                      <input type="decimal" name="fo" id="fuel oil" onChange={this.onChange} />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="lpg">
                      Lpg:
                      <input type="decimal" name="lpg" id="lpg" onChange={this.onChange} />
                    </label>
                  </div>
                  <div>
                    <input type="submit" value="Add" />
                    {/* <input type="submit" value="Edit" /> */}
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
