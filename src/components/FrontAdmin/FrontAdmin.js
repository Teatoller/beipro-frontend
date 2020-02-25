/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";

class FrontAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      front_office_id: "",
      diesel: "0.00",
      petrol: "0.00",
      kerosene: "0.00",
      fo: "0.00",
      ido: "0.00",
      lpg: "0.00",
      latestprices: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getOfficeData();
    this.priceData = setTimeout(() => this.getCurrentPriceData(), 1800);
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
        if (response) {
          this.setState({
            loading: false
          });
        }
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
        lpg: priceObj.lpg,
        loading: false
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
    this.setState({ loading: false });
  };

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/fadmincreate");
    this.setState({ loading: false });
  };

  // Select current price record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);

    history.push("/fadmindelete");

  };

  render() {
    // eslint-disable-next-line camelcase
    const { latestprices, loading } = this.state;

    const currentPrice = latestprices.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="depot">{index + 1}</td>
          <td className="depot">{item.front_office_id}</td>
          <td className="depot">{item.diesel}</td>
          <td className="depot">{item.petrol}</td>
          <td className="depot">{item.kerosene}</td>
          <td className="depot">{item.ido}</td>
          <td className="depot">{item.fo}</td>
          <td className="depot">{item.lpg}</td>
          <td className="depot">
            <button
              className="btn btn-sm btn-primary"
              type="button"
              priceid={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="depot">
            <button
              className="btn btn-sm btn-outline-danger"
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
            <span>{loading ? <Spinner /> : null}</span>
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
