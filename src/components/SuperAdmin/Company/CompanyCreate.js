/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Error from "../../Error";
import Spinner from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import CoName from "./CoName";
import CoLocation from "../../CompanyAdmin/CoLocation";
import ConstSAdmin from "../ConstSAdmin";
import UnAuthorized from "../../auth/common/UnAuthorized";
import CreateBtn from "../common/CreateBtn";
import BearerToken from "../../../services/BearerToken";

class CompanyCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: "",
      logo: "",
      description: "",
      location: "",
      country: "",
      established: "",
      companies: [],
      activePage: "1",
      itemCountPerPage: "10",
      errors: {
        name: "",
        logo: "",
        description: "",
        location: "",
        country: "",
        established: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // this.getAdminsData();
    this.getCompaniesData();
  }

  componentWillUnmount() {
    clearTimeout(this.adminData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    // eslint-disable-next-line camelcase
    const { name, logo, description, location, country, established } = this.state;
    e.preventDefault();
    const data = {
      name,
      logo,
      description,
      location,
      country,
      established
    };

    const { history } = this.props;
    const config = BearerToken();

    axios
      .post(`/companies`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/company`), 50);
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({
          errors: {
            name: err.response.request.response,
            logo: err.response.request.response,
            description: err.response.request.response,
            location: err.response.request.response,
            country: err.response.request.response,
            established: err.response.request.response
          }
        });
        throw err;
      });
  };

  getCompaniesData = () => {
    const config = BearerToken();

    axios.get(`/companies`, config).then(response => {
      const companiesData = response.data;
      this.setState({
        companies: companiesData,
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

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/company");
    this.setState({ loading: false });
  };

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const companyId = attribute.getAttribute("companyId");
    localStorage.setItem("companyId", companyId);

    // Delete selected front admin record
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

  render() {
    // eslint-disable-next-line camelcase
    const { companies, loading, errors } = this.state;
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

    const dangerStyle = {
      fontStyle: "italic",
      color: "red"
    };

    return (
      <div>
        <Nav />
        {newLocal ? (
          <>
            <div className="container" aria-label="Create company front admin form">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm-6 m-auto">
                  <h5 className="text-secondary">Entry Pad</h5>
                  <form noValidate onSubmit={this.onSubmit}>
                    <fieldset>
                      <h5 className="text-secondary">Company Details</h5>
                      <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">
                          Name:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <CoName onChange={this.onChange} />
                        </div>

                        <label htmlFor="logo" className="col-sm-2 col-form-label col-form-label-sm">
                          Logo:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="icon"
                            name="logo"
                            className="form-control form-control-sm"
                            id="logo"
                            placeholder="Enter company Icon"
                            onChange={this.onChange}
                            aria-describedby="companyIconInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>

                        <label
                          htmlFor="description"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Description:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="text"
                            name="description"
                            className="form-control form-control-sm"
                            id="description"
                            placeholder="Enter Company Description"
                            onChange={this.onChange}
                            aria-describedby="companyDescriptionInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>

                        <label
                          htmlFor="location"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Location:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <CoLocation onChange={this.onChange} />
                        </div>

                        <label
                          htmlFor="country"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Country:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="text"
                            name="country"
                            className="form-control form-control-sm"
                            id="country"
                            placeholder="Enter Country"
                            onChange={this.onChange}
                            aria-describedby="countryInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>
                        <label
                          htmlFor="established"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Established:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="decimal"
                            name="established"
                            className="form-control form-control-sm"
                            id="established"
                            placeholder="Enter Year Established"
                            onChange={this.onChange}
                            aria-describedby="establishedInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                          <span style={errors.country ? dangerStyle : null}>
                            <Error error={errors.country ? errors.country : null} />
                          </span>
                        </div>
                      </div>
                      <span className="font-italic text-secondary">
                        Click button to add a Company
                      </span>
                      <div className="row">
                        <CreateBtn handleCancelClick={this.handleCancelClick} />
                      </div>
                    </fieldset>
                  </form>
                </div>

                <div className="col-sm-6 m-auto">
                  <h5 className="text-secondary">Companies</h5>
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
                        </tr>
                      </thead>
                      <tbody>{currentItems}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Pagination
                itemCountPerPage={itemCountPerPage}
                totalItems={company.length}
                paginate={paginate}
              />
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
CompanyCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyCreate;
