import React, { PureComponent } from "react";
import axios from "../../axios";
import "../css/styles.css";
import Nav from "../Landing/Nav";

class FrontAdminEdit extends PureComponent {
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

    // Get selected current price and update state with new changes
    const priceid = localStorage.getItem("priceid");
    const { history } = this.props;

    axios
      .patch(`/currentprices/${priceid}`, data)
      .then(response => {
        history.push("/fadmin");
      })
      .catch(error => {
        console.log(error);
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

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", priceid);

    history.push("/fadminedit");
  };

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    console.log("testing delet...");
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", priceid);

    // Delete selected front admin record

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
        </tr>
      );
    });

    return (
      <div>
        <Nav />
        <main>
          <div id="main-div">
            <div id="left">
              <h6>Edit Entry Pad</h6>
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
                      />
                    </div>
                  </div>
                  <div>
                    <input className="btn btn-sm btn-success" type="submit" value="Change" />
                  </div>
                </fieldset>
              </form>
            </div>
            <div id="right">
              <h6>Current Price</h6>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      {/* <th>Front-office-id</th> */}
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
        </main>

        <footer className="footer-register">
          <span>Beipro &copy;2018</span>
        </footer>
      </div>
    );
  }
}
export default FrontAdminEdit;
