import React, { PureComponent } from "react";
import axios from "../../axios";
import Nav from "./Nav";
import "../css/depot.css";
import Footer from "./Footer";
import Spinner from "../../spinner/Spinner";
import Pagination from "../Pagination";

class Depots extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
    try {
      axios.get(`/depotprices`, {}).then(response => {
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
    const { selectedLocation, loading } = this.state;

    const selectedLocationItems = this.getLocationData(selectedLocation).map((item, index) => {
      const logoUrl = `./img/${item.logo}`;
      return (
        <tr key={item.id}>
          <td className="depot">{index + 1}</td>
          <td className="depot">
            <img className="imgsize" src={logoUrl} alt="" />
          </td>
          <td className="depot">{item.name}</td>
          <td className="depot">{item.diesel}</td>
          <td className="depot">{item.petrol}</td>
          <td className="depot">{item.kerosene}</td>
          <td className="depot">{item.ido}</td>
          <td className="depot">{item.fo}</td>
          <td className="depot">{item.lpg}</td>
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
              <div className="selector select-css">
                <select
                  style={{ color: "gray" }}
                  className="location-select select-css"
                  onChange={this.handleChange}
                >
                  <option value=" ">--Select location--</option>
                  <option selected value="Nairobi">
                    Nairobi
                  </option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Eldoret">Eldoret</option>
                  <option value="Kisumu">Kisumu</option>
                </select>
              </div>
              <main>
                <table className="table table-striped">
                  <thead>
                    <tr>
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
                        <td colSpan="8">
                          No items for
                          {"\u00A0"}
                          {selectedLocation}
                        </td>
                      </tr>
                    ) : (
                      currentItems
                    )}
                  </tbody>
                </table>
              </main>
            </div>
          </div>
          <Pagination
            itemCountPerPage={itemCountPerPage}
            totalItems={selectedLocationItems.length}
            paginate={paginate}
          />
        </div>
        <p className="size-petit">
          <a href="#top">Back to Top</a>
        </p>

        <Footer />
      </div>
    );
  }
}
export default Depots;
