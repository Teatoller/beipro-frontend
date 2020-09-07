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
import AdminRole from "./AdminRole";
import UnAuthorized from "../../auth/common/UnAuthorized";
import ConstSAdmin from "../ConstSAdmin";
import CreateBtn from "../common/CreateBtn";
import BearerToken from "../../../services/BearerToken";

class AdminCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      company_id: "",
      firstname: "",
      lastname: "",
      staff_id: "",
      email: "",
      role: "",
      admins: [],
      activePage: "1",
      itemCountPerPage: "10",
      errors: {
        company_id: "",
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        staff_id: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getAdminsData();
  }

  componentWillUnmount() {
    clearTimeout(this.adminData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    // eslint-disable-next-line camelcase
    const { company_id, firstname, lastname, staff_id, email, role } = this.state;
    e.preventDefault();
    const data = {
      company_id,
      firstname,
      lastname,
      staff_id,
      email,
      role
    };

    const { history } = this.props;
    const config = BearerToken();

    axios
      .post(`/admins`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/sadmin`), 50);
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({
          errors: {
            company_id: err.response.request.response,
            firstname: err.response.request.response,
            lastname: err.response.request.response,
            email: err.response.request.response,
            role: err.response.request.response,
            staff_id: err.response.request.response
          }
        });
        throw err;
      });
  };

  getAdminsData = () => {
    const config = BearerToken();

    axios.get(`/admins`, config).then(response => {
      const adminData = response.data;
      this.setState({
        admins: adminData,
        loading: false
      });
    });
  };

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);

    history.push("/sadminedit");
  };

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/sadmincreate");
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/sadmin");
    this.setState({ loading: false });
  };

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);

    // Delete selected front admin record
    const config = BearerToken();

    axios.delete(`/companyadmins/${sadminid}`, {}, config).then(
      response => {
        if (response) {
          history.push("/sadmin");
        }
      },
      error => {
        throw error;
      }
    );
  };

  render() {
    // eslint-disable-next-line camelcase
    const { admins, loading, errors } = this.state;
    const newLocal = ConstSAdmin();

    const companyAdminStaff = admins.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="admin text-center">{index + 1}</td>
          <td className="admin text-center">{item.company_id}</td>
          <td className="admin text-center">{item.firstname}</td>
          <td className="admin text-center">{item.lastname}</td>
          <td className="admin text-center">{item.staff_id}</td>
          <td className="admin text-center">{item.email}</td>
          <td className="admin text-center">{item.role}</td>
        </tr>
      );
    });

    const { activePage, itemCountPerPage } = this.state;
    // Get current items
    const indexOfLastItem = activePage * itemCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
    const currentItems = companyAdminStaff.slice(indexOfFirstItem, indexOfLastItem);

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
            {" "}
            <div className="container" aria-label="Create company front admin form">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm-6 m-auto">
                  <h5 className="text-secondary">Entry Pad</h5>
                  <form noValidate onSubmit={this.onSubmit}>
                    <fieldset>
                      <h5 className="text-secondary">Admin Details</h5>
                      <div className="form-group row">
                        <label
                          htmlFor="frontOfficeId"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Company Id:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="decimal"
                            name="company_id"
                            className="form-control form-control-sm"
                            id="companyId"
                            placeholder="Enter Company-id"
                            onChange={this.onChange}
                            aria-describedby="companyIdInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>

                        <label
                          htmlFor="lastName"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Firstname:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="text"
                            name="firstname"
                            className="form-control form-control-sm"
                            id="firstname"
                            placeholder="Enter Front-admin Firstname"
                            onChange={this.onChange}
                            aria-describedby="firstnameInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>

                        <label
                          htmlFor="lastName"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Lastname:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="text"
                            name="lastname"
                            className="form-control form-control-sm"
                            id="lastname"
                            placeholder="Enter Front-admin Lastname"
                            onChange={this.onChange}
                            aria-describedby="lastnameInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>

                        <label
                          htmlFor="email"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Email:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-sm"
                            id="email"
                            placeholder="Enter Front-admin Email"
                            onChange={this.onChange}
                            aria-describedby="emailInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>

                        <label htmlFor="role" className="col-sm-2 col-form-label col-form-label-sm">
                          Role:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <AdminRole onChange={this.onChange} />
                        </div>

                        <label
                          htmlFor="staffId"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Staff Id:
                        </label>
                        <div className="col-sm-10 mb-1">
                          <input
                            type="text"
                            name="staff_id"
                            className="form-control form-control-sm"
                            id="staffId"
                            placeholder="Enter Staff Id"
                            onChange={this.onChange}
                            aria-describedby="staffIdInput"
                            aria-required="true"
                            aria-invalid="false"
                          />
                          <span style={errors.email ? dangerStyle : null}>
                            <Error error={errors.email ? errors.email : null} />
                          </span>
                        </div>
                      </div>
                      <span className="font-italic text-secondary">
                        Click button to add a new Admin
                      </span>
                      <div className="row">
                        <CreateBtn handleCancelClick={this.handleCancelClick} />
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="col-sm-6 m-auto">
                  <h5 className="text-secondary">Admins</h5>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Company-id</th>
                          <th scope="col">Firstname</th>
                          <th scope="col">Lastname</th>
                          <th scope="col">Staff_id</th>
                          <th scope="col">Email</th>
                          <th scope="col">Role</th>
                        </tr>
                      </thead>
                      <tbody>{currentItems}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Pagination
                itemCountPerPage={itemCountPerPage}
                totalItems={companyAdminStaff.length}
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
AdminCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default AdminCreate;
