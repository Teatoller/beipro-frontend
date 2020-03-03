/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";

class FrontAdminCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      front_office_id: "",
      diesel: "",
      petrol: "",
      kerosene: "",
      fo: "",
      ido: "",
      lpg: "",
      latestprices: [],
      errors: {
        front_office_id: "",
        diesel: "",
        petrol: "",
        kerosene: "",
        ido: "",
        fo: "",
        lpg: ""
      }
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

    const { history } = this.props;

    axios
      .post(`/currentprices`, data)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/fadmin`), 50);
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({
          errors: {
            front_office_id: err.response.request.response,
            diesel: err.response.request.response,
            petrol: err.response.request.response,
            kerosene: err.response.request.response,
            ido: err.response.request.response,
            fo: err.response.request.response,
            lpg: err.response.request.response
          }
        });
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
          lpg: priceObj.lpg,
          loading: false
        });
      });
    } catch (err) {
      // throw err;
      this.setState({
        errors: {
          front_office_id: err.response.request.response,
          diesel: err.response.request.response,
          petrol: err.response.request.response,
          kerosene: err.response.request.response,
          ido: err.response.request.response,
          fo: err.response.request.response,
          lpg: err.response.request.response
        }
      });
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
    this.setState({ loading: false });
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/fadmin");
    this.setState({ loading: false });
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
        this.setState({ loading: false });
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const {
      // eslint-disable-next-line camelcase
      front_office_id,
      diesel,
      petrol,
      kerosene,
      ido,
      fo,
      lpg,
      latestprices,
      errors,
      loading
    } = this.state;

    const company = localStorage.getItem("name1");
    const location = localStorage.getItem("location");

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
        </tr>
      );
    });

    const dangerStyle = {
      fontStyle: "italic",
      color: "red"
    };

    return (
      <div>
        <Nav />
        <div className="container" aria-label="Create current price form">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col">
              <h6>
                Entry Pad: {company}-{location}
              </h6>
              <form noValidate onSubmit={this.onSubmit}>
                <fieldset className="front-fieldset">
                  <fieldset disabled className="admin-fieldset">
                    <div className="form-group row">
                      <label
                        htmlFor="frontOfficeId"
                        className="col-sm-2 col-form-label col-form-label-sm"
                      >
                        Office Id:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="decimal"
                          name="front_office_id"
                          id="frontOfficeId"
                          className="form-control"
                          placeholder="Disabled input"
                          // eslint-disable-next-line camelcase
                          value={front_office_id}
                          aria-describedby="frontOfficeIdInput"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <h6>Price Input</h6>
                  <div className="form-group row">
                    <label htmlFor="diesel" className="col-sm-2 col-form-label col-form-label-sm">
                      Diesel:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="diesel"
                        id="diesel"
                        placeholder={diesel}
                        onChange={this.onChange}
                        aria-describedby="dieselPriceInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="petrol" className="col-sm-2 col-form-label col-form-label-sm">
                      Petrol:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="petrol"
                        id="petrol"
                        placeholder={petrol}
                        onChange={this.onChange}
                        aria-describedby="petrolePriceInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="kerosene" className="col-sm-2 col-form-label col-form-label-sm">
                      Kerosene:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="kerosene"
                        id="kerosene"
                        placeholder={kerosene}
                        onChange={this.onChange}
                        aria-describedby="kerosenePriceInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="ido" className="col-sm-2 col-form-label col-form-label-sm">
                      Ido:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="ido"
                        id="ido"
                        placeholder={ido}
                        onChange={this.onChange}
                        aria-describedby="idoPriceInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="fuelOil" className="col-sm-2 col-form-label col-form-label-sm">
                      Fuel Oil:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="fo"
                        id="fuelOil"
                        placeholder={fo}
                        onChange={this.onChange}
                        aria-describedby="fuelOilPriceInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="lpg" className="col-sm-2 col-form-label col-form-label-sm">
                      Bulk Lpg:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="lpg"
                        id="lpg"
                        placeholder={lpg}
                        onChange={this.onChange}
                        aria-describedby="bulkLpgPriceInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                      <span style={errors.diesel ? dangerStyle : null}>
                        <Error error={errors.diesel ? errors.diesel : null} />
                      </span>
                    </div>
                  </div>
                  <div className="btn-spacing">
                    <input className="btn btn-sm btn-success" type="submit" value="Add" />
                  </div>
                </fieldset>
              </form>
              <div className="btn-spacing">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={this.handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>

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
                  </tr>
                </thead>
                <tbody>{currentPrice}</tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
FrontAdminCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontAdminCreate;
