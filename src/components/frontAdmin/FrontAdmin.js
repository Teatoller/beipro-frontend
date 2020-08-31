import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";
import UnAuthorized from "../auth/common/UnAuthorized";
import ConstFrontAdmin from "./ConstFrontAdmin";
import BearerToken from "../../services/BearerToken";

class FrontAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      latestprices: []
    };
  }

  componentDidMount() {
    this.getOfficeData();
    this.priceData = setTimeout(() => this.getCurrentPriceData(), 1800);
    this.getFofficeData();
  }

  componentWillUnmount() {
    clearTimeout(this.priceData);
  }

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
    const config = BearerToken();

    axios
      .get(`/frontadmins`, config)
      .then(response => {
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

        localStorage.setItem("front_office_id", lockey);
      })
      .catch(error => {
        throw error;
      });
  };

  // Display current price as placeholder value

  getCurrentPriceData = () => {
    const config = BearerToken();

    axios
      .get(`/currentprices`, config)
      .then(response => {
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

        this.setState({
          latestprices,
          loading: false
        });
      })
      .catch(error => {
        throw error;
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

  // phase 1 Establish the company front offices name and location

  getFofficeData = () => {
    const config = BearerToken();

    const frontid = localStorage.getItem("front_office_id");
    const frontId = parseInt(frontid, 10);
    axios.get(`/frontoffices/${frontId}`, config).then(response => {
      const fofficesData = response.data;

      const officesObj = fofficesData[0];

      if (officesObj) {
        localStorage.setItem("name1", officesObj.name);
        localStorage.setItem("location", officesObj.location);
      }
    });
  };

  // end experiment

  render() {
    const { latestprices, loading } = this.state;
    const company = localStorage.getItem("name1");
    const location = localStorage.getItem("location");
    const newLocal = ConstFrontAdmin();

    const currentPrice = latestprices.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="depot text-center">{index + 1}</td>
          <td className="depot text-center">{item.front_office_id}</td>
          <td className="depot text-center">{item.diesel}</td>
          <td className="depot text-center">{item.petrol}</td>
          <td className="depot text-center">{item.kerosene}</td>
          <td className="depot text-center">{item.ido}</td>
          <td className="depot text-center">{item.fo}</td>
          <td className="depot text-center">{item.lpg}</td>
          <td className="depot text-center">
            <button
              className="btn btn-sm btn-primary"
              type="button"
              priceid={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="depot text-center">
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
        {newLocal ? (
          <>
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h5 className="text-secondary">
                    Current Price: {company}-{location}
                  </h5>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover table-bordered text-secondary">
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
              </div>
              <span className="font-italic form-text text-muted">
                Click button to add a new current price
              </span>
              <div className="col-1-sm m-2">
                <button
                  className="btn btn-sm btn-success"
                  type="submit"
                  onClick={this.handleCreateClick}
                >
                  Add
                </button>
              </div>
            </div>
          </>
        ) : (
          <UnAuthorized />
        )}
        <Footer />
      </div>
    );
  }
}
FrontAdmin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontAdmin;
