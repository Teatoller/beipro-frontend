import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import Pagination from "../../Pagination";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      companies: [],
      activePage: "1",
      itemCountPerPage: "10"
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
    axios.get(`/auth/companies`, config).then(response => {
      const companyData = response.data;
      this.setState({
        companies: companyData,
        loading: false
      });
    });
  };

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const companyId = attribute.getAttribute("companyId");
    localStorage.setItem("companyId", companyId);

    history.push("/companyedit");
  };

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/companycreate");
  };

  // Select company record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const companyId = attribute.getAttribute("companyId");
    localStorage.setItem("companyId", companyId);

    history.push("/companydelete");
  };

  render() {
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
              className="btn btn-sm btn-primary"
              type="button"
              companyId={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="company">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              companyId={item.id}
              onClick={this.handleDeleteClick}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    const { activePage, itemCountPerPage } = this.state;
    // Get current items
    const indexOfLastItem = activePage * itemCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
    const currentItems = company.slice(indexOfFirstItem, indexOfLastItem);

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
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col-sm">
              <h6>Company details</h6>
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
                    <th scope="col">Action</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>{currentItems}</tbody>
              </table>
            </div>
          </div>

          <span>Click button to add a new Company</span>

          <div className="btn-spacing">
            <button
              className="btn btn-sm btn-success"
              type="submit"
              onClick={this.handleCreateClick}
            >
              Add
            </button>
          </div>
          <Pagination
            itemCountPerPage={itemCountPerPage}
            totalItems={company.length}
            paginate={paginate}
          />
        </div>

        <Footer />
      </div>
    );
  }
}
Company.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Company;
