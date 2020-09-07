/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import { Nav } from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Error from "../../Error";
import { Spinner } from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import ConstSAdmin from "../ConstSAdmin";
import UnAuthorized from "../../auth/common/UnAuthorized";
import EditBtn from "../common/EditBtn";
import BearerToken from "../../../services/BearerToken";

class FrontOfficeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      company_id: "",
      name: "",
      code: "",
      location: "",
      frontoffices: [],
      activePage: "1",
      itemCountPerPage: "10",
      errors: {
        company_id: "",
        name: "",
        code: "",
        location: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getFrontOfficesData();
    this.getFrontOfficeData();
  }

  // componentWillUnmount() {
  //   clearTimeout(this.adminData);
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    // eslint-disable-next-line camelcase
    const { company_id, name, code, location } = this.state;
    e.preventDefault();
    const data = {
      company_id,
      name,
      code,
      location
    };

    const frontofficeId = localStorage.getItem("frontofficeId");
    const { history } = this.props;
    const config = BearerToken();

    axios
      .patch(`/frontoffices/${frontofficeId}`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/frontoffice`), 50);
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({
          errors: {
            company_id: err.response.request.response,
            name: err.response.request.response,
            code: err.response.request.response,
            location: err.response.request.response
          }
        });
        throw err;
      });
  };

  getFrontOfficesData = () => {
    const config = BearerToken();

    axios.get(`/frontoffices`, config).then(response => {
      const frontOfficesData = response.data;
      this.setState({
        frontoffices: frontOfficesData,
        loading: false
      });
    });
  };

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    history.push("/frontofficeedit");
  };

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/frontofficecreate");
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/frontoffice");
    this.setState({ loading: false });
  };

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    // Delete selected front admin record
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

  getFrontOfficeData = () => {
    const frontofficeId = localStorage.getItem("frontofficeId");
    const config = BearerToken();

    axios.get(`/frontoffices/${frontofficeId}`, config).then(response => {
      const selectedFrontOfficeData = response.data;

      const adminObj = selectedFrontOfficeData[0];

      this.setState({
        company_id: adminObj.company_id,
        name: adminObj.name,
        code: adminObj.code,
        location: adminObj.location,
        loading: false
      });
    });
  };

  render() {
    // eslint-disable-next-line camelcase
    const { frontoffices, loading, errors, company_id, name, code, location } = this.state;
    const newLocal = ConstSAdmin();

    const frontOffice = frontoffices.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="foffices text-center">{index + 1}</td>
          <td className="foffices text-center">{item.company_id}</td>
          <td className="foffices text-center">{item.name}</td>
          <td className="foffices text-center">{item.code}</td>
          <td className="foffices text-center">{item.location}</td>
        </tr>
      );
    });

    const { activePage, itemCountPerPage } = this.state;
    // Get current items
    const indexOfLastItem = activePage * itemCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
    const currentItems = frontOffice.slice(indexOfFirstItem, indexOfLastItem);

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
                      <h6>Front Office Detail&apos;s</h6>
                      <div className="form-group row">
                        <label htmlFor="companyId" className="col-sm-2 col-form-label-sm">
                          Company Id:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="decimal"
                            name="company_id"
                            className="form-control form-control-sm"
                            id="companyId"
                            placeholder={company_id}
                            onChange={this.onChange}
                            aria-describedby="companyIdInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>

                        <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">
                          Name:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="text"
                            name="name"
                            className="form-control form-control-sm"
                            id="name"
                            placeholder={name}
                            onChange={this.onChange}
                            aria-describedby="frontOfficeNameInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>

                        <label htmlFor="code" className="col-sm-2 col-form-label col-form-label-sm">
                          Code:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="text"
                            name="code"
                            className="form-control form-control-sm"
                            id="code"
                            placeholder={code}
                            onChange={this.onChange}
                            aria-describedby="frontOfficeCodeInput"
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
                          <input
                            type="text"
                            name="location"
                            className="form-control form-control-sm"
                            id="location"
                            placeholder={location}
                            Location
                            onChange={this.onChange}
                            aria-describedby="locationInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                          <span style={errors.location ? dangerStyle : null}>
                            <Error error={errors.location ? errors.location : null} />
                          </span>
                        </div>
                      </div>
                      <span className="font-italic text-secondary">
                        Click button to change front office detail
                      </span>
                      <div className="row">
                        <EditBtn handleCancelClick={this.handleCancelClick} />
                      </div>
                    </fieldset>
                  </form>
                </div>

                <div className="col-sm-6 mx-auto">
                  <h5 className="text-secondary">Front Offices</h5>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Company Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Code</th>
                          <th scope="col">Location</th>
                        </tr>
                      </thead>
                      <tbody>{currentItems}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Pagination
                itemCountPerPage={itemCountPerPage}
                totalItems={frontOffice.length}
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
FrontOfficeEdit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOfficeEdit;
