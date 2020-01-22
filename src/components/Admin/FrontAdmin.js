import React, { Component } from "react";
import axios from "../../axios";
import "../css/styles.css";
import Nav from "../Landing/Nav";

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
      lpg: "",
      latestprices: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getOfficeData();
    this.priceData = setTimeout(() => this.getCurrentPriceData(), 300);
  }

  componentWillUnmount() {
    clearTimeout(this.priceData);
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
        localStorage.setItem("front_office_id", lockey);
      });
    } catch (error) {
      throw error;
    }
  };

  // Display current price as placeholder value

  getCurrentPriceData = () => {
    // eslint-disable-next-line camelcase
    // const {front_office_id} = this.state;

    try {
      axios.get(`/currentprices`, {}).then(response => {
        const currentPriceData = response.data;
        const frontOfficeId = parseInt(localStorage.getItem("front_office_id"), 10);

        // Array with object containing details of the front office current prices

        const priceArray = currentPriceData.filter(
          object => object.front_office_id === frontOfficeId
        );

        // sort prices in reverse to get the latest price

        const latestprices = [];

        const sortbyid = priceArray.sort((c1, c2) => (c1.id > c2.id ? 1 : -1)).pop();

        latestprices.push(sortbyid);

        // Object containing detail of front office latest current price
        const priceObj = latestprices[0];

        this.setState({
          latestprices,
          diesel: priceObj.diesel,
          petrol: priceObj.petrol,
          kerosene: priceObj.kerosene,
          ido: priceObj.ido,
          fo: priceObj.fo,
          lpg: priceObj.lpg
        });
      });
    } catch (error) {
      throw error;
    }
  };

  // Select current price record to edit

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);

    history.push("/fadminedit");
  };

  // Select current price record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);

    // Delete selected current price record

    axios.delete(`/currentprices/${priceid}`, {}).then(
      response => {
        history.push("/fadmin");
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    // eslint-disable-next-line camelcase
    const { front_office_id, diesel, petrol, kerosene, ido, fo, lpg, latestprices } = this.state;

    const currentPrice = latestprices.map((item, index) => {
      return (
        <tr key={item.index}>
          <td>{index + 1}</td>
          {/* <td>{item.front_office_id}</td> */}
          <td>{item.diesel}</td>
          <td>{item.petrol}</td>
          <td>{item.kerosene}</td>
          <td>{item.ido}</td>
          <td>{item.fo}</td>
          <td>{item.lpg}</td>
          <td>
            <button
              className="btn btn-sm btn-success"
              type="button"
              priceid={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              type="button"
              priceid={item.id}
              onClick={this.handleDeleteClick}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Nav />
        <main>
          <div id="main-div">
            <div id="left">
              <form noValidate onSubmit={this.onSubmit}>
                <fieldset disabled className="front-fieldset">
                  <legend>Front Office Admin</legend>
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
                      <input
                        style={{ color: "red" }}
                        type="decimal"
                        name="diesel"
                        id="diesel"
                        placeholder={diesel}
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="petrol">
                      Petrol:
                      <input
                        type="decimal"
                        name="petrol"
                        id="petrol"
                        placeholder={petrol}
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="kerosene">
                      Kerosene:
                      <input
                        type="decimal"
                        name="kerosene"
                        id="kerosene"
                        placeholder={kerosene}
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="ido">
                      Ido:
                      <input
                        type="decimal"
                        name="ido"
                        id="ido"
                        placeholder={ido}
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="fuel oil">
                      Fuel Oil:
                      <input
                        type="decimal"
                        name="fo"
                        id="fuel oil"
                        placeholder={fo}
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div className="form-example">
                    <label htmlFor="lpg">
                      Lpg:
                      <input
                        type="decimal"
                        name="lpg"
                        id="lpg"
                        placeholder={lpg}
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <input type="submit" value="Add" />
                  </div>
                </fieldset>
              </form>
            </div>
            <div id="right">
              <h6>Current Price</h6>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    {/* <th>Front-office-id</th> */}
                    <th>Diesel</th>
                    <th>Petrol</th>
                    <th>Kerosene</th>
                    <th>Ido</th>
                    <th>Fuel Oil</th>
                    <th>Lpg</th>
                    <th>Action</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>{currentPrice}</tbody>
              </table>
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
