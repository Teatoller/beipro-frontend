import React, { PureComponent } from "react";
import axios from "../../axios";
import Nav from "./Nav";
import "../css/site.css";
import Footer from "./Footer";
import Spinner from "../../spinner/Spinner";
import Pagination from "../Pagination";
import Chevron from "./Chevron";

class Depots extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      curTime: new Date().toLocaleString(),
      frontoffices: [],
      selectedLocation: "Nairobi",
      activePage: "1",
      itemCountPerPage: "10"
    };
  }

  componentDidMount() {
    this.getFrontofficeData();
  }

  getFrontofficeData = () => {
    this.setState({ loading: true });
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    try {
      axios.get(`/depotprices`, config).then(response => {
        // eslint-disable-next-line prefer-destructuring
        const data = response.data;
        this.setState({
          frontoffices: data,
          loading: false
        });
      });
    } catch (error) {
      this.setState({ loading: false });
      throw error;
    }
  };

  handleChange = event => this.setState({ selectedLocation: event.target.value });

  getLocationData = location => {
    const { frontoffices } = this.state;

    /**
     * Step 1: Filter and create array for a location
     */
    const selectedLocation = frontoffices.filter(object => object.location === location);

    return selectedLocation;
  };

  render() {
    const { selectedLocation, loading, curTime } = this.state;

    const selectedLocationItems = this.getLocationData(selectedLocation).map((item, index) => {
      const logoUrl = `./img/${item.logo}`;
      return (
        <tr key={item.id}>
          <td className="depot text-center">{index + 1}</td>
          <td className="depot text-center">
            <img className="company-logo" src={logoUrl} alt="" />
          </td>
          <td className="depot text-center">{item.name}</td>
          <td className="depot text-center">{item.diesel}</td>
          <td className="depot text-center">{item.petrol}</td>
          <td className="depot text-center">{item.kerosene}</td>
          <td className="depot text-center">{item.ido}</td>
          <td className="depot text-center">{item.fo}</td>
          <td className="depot text-center">{item.lpg}</td>
        </tr>
      );
    });

    const { activePage, itemCountPerPage } = this.state;
    // Get current items
    const indexOfLastItem = activePage * itemCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
    const currentItems = selectedLocationItems.slice(indexOfFirstItem, indexOfLastItem);

    // Change page

    const paginate = pageNumber => {
      this.setState({
        activePage: pageNumber
      });
    };

    return (
      <div>
        <Nav />

        <div className="container">
          <div className="row" id="top">
            <div className="col-sm">
              <span>{loading ? <Spinner /> : null}</span>
              <select
                className="custom-select custom-select-sm w-50 text-muted"
                onChange={this.handleChange}
              >
                <option selected>Select a location</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Eldoret">Eldoret</option>
              </select>
              <main>
                <span className="form-text text-muted">
                  <small>
                    {"\u00A0"}
                    {selectedLocation}
                    {"\u00A0"}
                    prices as at {curTime}
                  </small>
                </span>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover">
                    <thead>
                      <tr className="text-secondary text-center">
                        <th scope="col">#</th>
                        <th scope="col">Logo</th>
                        <th scope="col">Company</th>
                        <th scope="col">Diesel</th>
                        <th scope="col">Petrol</th>
                        <th scope="col">Kerosene</th>
                        <th scope="col">Ido</th>
                        <th scope="col">Fuel Oil</th>
                        <th scope="col">Bulk Lpg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLocationItems.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="form-text text-muted">
                            <small>
                              No items for
                              {"\u00A0"}
                              {selectedLocation}
                            </small>
                          </td>
                        </tr>
                      ) : (
                        currentItems
                      )}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
          <div className="fixed-bottom mb-3">
            {" "}
            <Pagination
              itemCountPerPage={itemCountPerPage}
              totalItems={selectedLocationItems.length}
              paginate={paginate}
            />
          </div>
          <span className="p-2 ml-5 mb-2">
            <a href="#top">
              <small className="form-text text-muted">
                <Chevron />
                Top
              </small>
            </a>
          </span>
        </div>

        <Footer />
      </div>
    );
  }
}
export default Depots;
