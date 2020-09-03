/* eslint-disable max-len */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import ConstSAdmin from "../ConstSAdmin";
import UnAuthorized from "../../auth/common/UnAuthorized";
import CancelBtn from "../common/CancelBtn";
import BearerToken from "../../../services/BearerToken";

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
    const config = BearerToken();

    axios.get(`/frontoffices/${frontofficeId}`, config).then(response => {
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
    const config = BearerToken();

    axios.delete(`/frontoffices/${frontofficeId}`, config).then(
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
          <td className="foffices text-center">{index + 1}</td>
          <td className="foffices text-center">{item.company_id}</td>
          <td className="foffices text-center">{item.name}</td>
          <td className="foffices text-center">{item.code}</td>
          <td className="foffices text-center">{item.location}</td>
          <td className="foffices text-center">
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

    return (
      <div>
        <Nav />
        {newLocal ? (
          <>
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h5 className="text-secondary">Front Office details</h5>
                  <div className="alert alert-danger" role="alert">
                    <strong>Warning! </strong>Are you sure that you want to delete this record?
                  </div>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover table-bordered text-secondary">
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
              </div>
              <div>
                <CancelBtn handleCancelClick={this.handleCancelClick} />
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
