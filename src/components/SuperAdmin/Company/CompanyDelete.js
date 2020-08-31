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

class CompanyDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      companies: []
    };
  }

  componentDidMount() {
    this.getCompaniesData();
  }

  getCompaniesData = () => {
    const config = BearerToken();

    const companyId = localStorage.getItem("companyId");
    axios.get(`/companies/${companyId}`, config).then(response => {
      const companyData = response.data;
      this.setState({
        companies: companyData,
        loading: false
      });
    });
  };

  // Select company record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const companyId = attribute.getAttribute("companyId");
    localStorage.setItem("companyId", companyId);

    // Delete selected company record
    const config = BearerToken();

    axios.delete(`/companies/${companyId}`, config).then(
      response => {
        if (response) {
          history.push("/company");
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

    history.push("/company");
    this.setState({ loading: false });
  };

  render() {
    // eslint-disable-next-line camelcase
    const { companies, loading } = this.state;
    const newLocal = ConstSAdmin();

    const company = companies.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="company text-center">{index + 1}</td>
          <td className="company text-center">{item.id}</td>
          <td className="company text-center">{item.name}</td>
          <td className="company text-center">{item.logo}</td>
          <td className="company text-center">{item.description}</td>
          <td className="company text-center">{item.location}</td>
          <td className="company text-center">{item.country}</td>
          <td className="company text-center">{item.established}</td>
          <td className="company text-center">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              companyId={item.id}
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
                  <h5 className="text-secondary">Company details</h5>
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
                          <th scope="col">Logo</th>
                          <th scope="col">Description</th>
                          <th scope="col">Location</th>
                          <th scope="col">Country</th>
                          <th scope="col">Established</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>{company}</tbody>
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
CompanyDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyDelete;
