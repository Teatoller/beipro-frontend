import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";

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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    const companyId = localStorage.getItem("companyId");
    axios.get(`/auth/companies/${companyId}`, config).then(response => {
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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.delete(`/auth/companies/${companyId}`, config).then(
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

    const company = companies.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="company">{index + 1}</td>
          <td className="company">{item.id}</td>
          <td className="company">{item.name}</td>
          <td className="company">{item.logo}</td>
          <td className="company">{item.description}</td>
          <td className="company">{item.location}</td>
          <td className="company">{item.country}</td>
          <td className="company">{item.established}</td>
          <td className="company">
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

    const dangerStyle = {
      fontStyle: "italic",
      fontWeight: "bold",
      color: "red"
    };

    return (
      <div>
        <Nav />

        <div className="container">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col-sm">
              <h6>Company details</h6>
              <span style={dangerStyle}>Are you sure that you want to Delete this record?</span>
              <table className="table table-striped">
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

        <Footer />
      </div>
    );
  }
}
CompanyDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyDelete;
