import React, { PureComponent } from "react";
import axios from "../../axios";
import "../css/styles.css";

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
        <tr key={item.index}>
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
      color: "whitesmoke"
    };

    return (
      <div>
        <main>
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

          <div className="price-list">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>Diesel</th>
                  <th>Petrol</th>
                  <th>Kerosene</th>
                  <th>Ido</th>
                  <th>Fuel Oil</th>
                  <th>Lpg</th>
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
        </main>

        <footer className="footer-register">
          <span>Beipro &copy;2018</span>
        </footer>
      </div>
    );
  }
}
export default Depots;
