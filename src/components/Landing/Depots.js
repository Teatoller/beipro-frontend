import React, { PureComponent } from "react";
import axios from "../../axios";
import Nav from "./Nav";
import "../css/depot.css";
import Footer from "./Footer";

class Depots extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      frontoffices: [],
      selectedLocation: "Nairobi"
    };
  }

  componentDidMount() {
    this.getFrontofficeData();
  }

  getFrontofficeData = () => {
    this.setState({ loading: true });
    try {
      axios.get(`/depotprices`, {}).then(response => {
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
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.diesel}</td>
          <td>{item.petrol}</td>
          <td>{item.kerosene}</td>
          <td>{item.ido}</td>
          <td>{item.fo}</td>
          <td>{item.lpg}</td>
        </tr>
      );
    });

    const loadingStyle = {
      fontStyle: "italic",
      color: "white"
    };

    return (
      <div>
        <Nav />

        <div className="container">
          <div className="row">
            <div className="col-sm">
              <span style={loading ? null : loadingStyle}>loading...</span>
              <div className="selector">
                <span>
                  Showing results for
                  {"\u00A0"}
                  {selectedLocation}
                  {"\u00A0"}
                </span>
                <select
                  style={{ color: "gray" }}
                  className="location-select"
                  onChange={this.handleChange}
                >
                  {/* <option value=" ">--Select location--</option> */}
                  <option value="Nairobi">Nairobi</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Eldoret">Eldoret</option>
                  <option value="Kisumu">Kisumu</option>
                </select>
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
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
                      <td colSpan="8" style={{ color: "gray" }}>
                        No items for
                        {"\u00A0"}
                        {selectedLocation}
                      </td>
                    </tr>
                  ) : (
                    selectedLocationItems
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
export default Depots;
