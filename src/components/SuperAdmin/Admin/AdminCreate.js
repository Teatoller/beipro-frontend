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
import AdminRole from "./AdminRole";
import UnAuthorized from "../../auth/common/UnAuthorized";
import ConstSAdmin from "../ConstSAdmin";

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

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

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
          <td className="admin">{index + 1}</td>
          <td className="admin">{item.company_id}</td>
          <td className="admin">{item.firstname}</td>
          <td className="admin">{item.lastname}</td>
          <td className="admin">{item.staff_id}</td>
          <td className="admin">{item.email}</td>
          <td className="admin">{item.role}</td>
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
                <div className="col-sm">
                  <h6>Entry Pad</h6>
                  <form noValidate onSubmit={this.onSubmit}>
                    <fieldset className="front-fieldset">
                      <h6>Admin Details</h6>
                      <div className="form-group row">
                        <label
                          htmlFor="frontOfficeId"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Company Id:
                        </label>
                        <div className="col-sm-10">
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
                        <div className="col-sm-10">
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
                        <div className="col-sm-10">
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
                        <div className="col-sm-10">
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
                        <div className="col-sm-10">
                          <AdminRole onChange={this.onChange} />
                        </div>

                        <label
                          htmlFor="staffId"
                          className="col-sm-2 col-form-label col-form-label-sm"
                        >
                          Staff Id:
                        </label>
                        <div className="col-sm-10">
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
                      <div className="btn-spacing">
                        <input className="btn btn-sm btn-success" type="submit" value="Create" />
                      </div>
                    </fieldset>
                  </form>
                  <div className="btn-spacing">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={this.handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="col-sm">
                  <h6>Admins</h6>
                  <table className="table table-striped">
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
