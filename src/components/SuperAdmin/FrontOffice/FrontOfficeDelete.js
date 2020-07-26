import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import ConstSAdmin from "../ConstSAdmin";
import UnAuthorized from "../../auth/common/UnAuthorized";

class FrontOfficeDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      frontoffices: []
    };
  }

  componentDidMount() {
    this.getFrontOfficesData();
  }

  getFrontOfficesData = () => {
    const frontofficeId = localStorage.getItem("frontofficeId");
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.get(`/auth/frontoffices/${frontofficeId}`, config).then(response => {
      const frontofficeData = response.data;
      this.setState({
        frontoffices: frontofficeData,
        loading: false
      });
    });
  };

  // Select front office record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    // Delete selected front office record
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.delete(`/auth/frontoffices/${frontofficeId}`, config).then(
      response => {
        if (response) {
          history.push("/frontoffice");
        }
      },
      error => {
        throw error;
      }
    );
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/frontoffice");
    this.setState({ loading: false });
  };

  render() {
    // eslint-disable-next-line camelcase
    const { frontoffices, loading } = this.state;
    const newLocal = ConstSAdmin();

    const frontOffice = frontoffices.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="foffices">{index + 1}</td>
          <td className="foffices">{item.company_id}</td>
          <td className="foffices">{item.name}</td>
          <td className="foffices">{item.code}</td>
          <td className="foffices">{item.location}</td>
          <td className="foffices">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              frontofficeId={item.id}
              onClick={this.handleDeleteClick}
            >
              Yes
            </button>
          </td>
        </tr>
      );
    });

    const dangerStyle = {
      fontStyle: "italic",
      fontWeight: "bold",
      color: "red"
    };

    return (
      <div>
        <Nav />
        {newLocal ? (
          <>
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h6>Front Office details</h6>
                  <span style={dangerStyle}>Are you sure that you want to Delete this record?</span>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Company Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Location</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>{frontOffice}</tbody>
                  </table>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={this.handleCancelClick}
                >
                  Cancel
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
FrontOfficeDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOfficeDelete;
