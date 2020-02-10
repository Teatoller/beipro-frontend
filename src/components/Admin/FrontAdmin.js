/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";

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
      latestprices: [],
      message: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getOfficeData();
    this.priceData = setTimeout(() => this.getCurrentPriceData(), 1500);
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

    axios
      .post(`/currentprices`, data)
      .then(response => {
        const message = response.data;
        this.setState({
          message
        });
      })
      .catch(err => {
        throw err;
      });
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
    axios.get(`/frontadmins`, {}).then(response => {
      const frontadminsdata = response.data;
      const loggedUserEmail = localStorage.getItem("email");

      // Array with object containing details of the logged user

      const userArray = frontadminsdata.filter(object => object.email === loggedUserEmail);

      // Object containing detail of logged user
      const userObj = userArray[0];

      // Key
      // eslint-disable-next-line consistent-return
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
  };

  // Display current price as placeholder value

  getCurrentPriceData = () => {
    // eslint-disable-next-line camelcase
    // const {front_office_id} = this.state;

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

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/fadmincreate");
  };

  // Select current price record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);

    // Delete selected current price record

    axios
      .delete(`/currentprices/${priceid}`, {})
      .then(response => {
        if (response) {
          history.push("/fadmin");
        }
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    // eslint-disable-next-line camelcase
    const { latestprices } = this.state;

    const currentPrice = latestprices.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.front_office_id}</td>
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
        <div className="container">
          <div className="row">
            <div className="col">
              <h6>Current Price</h6>
              <table className="table table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Front-office-id</th>
                    <th scope="col">Diesel</th>
                    <th scope="col">Petrol</th>
                    <th scope="col">Kerosene</th>
                    <th scope="col">Ido</th>
                    <th scope="col">Fuel Oil</th>
                    <th scope="col">Lpg</th>
                    <th scope="col">Action</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>{currentPrice}</tbody>
              </table>
            </div>
          </div>
          <span>Click button to add a new current price</span>
          <div>
            <button
              className="btn btn-sm btn-success"
              type="submit"
              onClick={this.handleCreateClick}
            >
              Add
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
FrontAdmin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontAdmin;
