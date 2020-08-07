/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";
import Pagination from "../Pagination";
import CoLocation from "./CoLocation";
import CoAdminRole from "./CoAdminRole";
import ConstCoAdmin from "./ConstCoAdmin";
import UnAuthorized from "../auth/common/UnAuthorized";

class CompanyAdminCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      admin_id: "",
      firstname: "",
      lastname: "",
      staff_id: "",
      email: "",
      role: "",
      location: "",
      fadmins: [],
      f1: "",
      f2: "",
      f3: "",
      f4: "",
      f5: "",
      f1loc: "",
      f2loc: "",
      f3loc: "",
      f4loc: "",
      f5loc: "",
      activePage: "1",
      itemCountPerPage: "5",
      errors: {
        front_office_id: "",
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        staff_id: "",
        location: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.input = React.createRef();
  }

  componentDidMount() {
    this.getOfficeData();
    this.adminData = setTimeout(() => this.getFrontAdminsData(), 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.adminData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    // eslint-disable-next-line camelcase
    const { f1, f2, f3, f4, f5 } = this.state;
    const front_office_id =
      this.input.current.value === f1 ||
      this.input.current.value === f2 ||
      this.input.current.value === f3 ||
      this.input.current.value === f4 ||
      this.input.current.value === f5
        ? this.input.current.value
        : "error";

    const { admin_id, firstname, lastname, staff_id, email, role, location } = this.state;
    e.preventDefault();
    const data = {
      admin_id,
      front_office_id,
      firstname,
      lastname,
      staff_id,
      email,
      role,
      location
    };

    const { history } = this.props;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios
      .post(`/companyadmins`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/admin`), 50);
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({
          errors: {
            front_office_id: err.response.request.response,
            firstname: err.response.request.response,
            lastname: err.response.request.response,
            email: err.response.request.response,
            role: err.response.request.response,
            staff_id: err.response.request.response,
            location: err.response.request.response
          }
        });
        throw err;
      });
  };

  getOfficeData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.get(`/combineadmins`, config).then(response => {
      const adminsdata = response.data;

      const adminId = adminsdata.id;

      const lockey = parseInt(adminId, 10);

      localStorage.setItem("admin_id", lockey);

      this.setState({
        admin_id: lockey,
        f1: localStorage.getItem("f1"),
        f2: localStorage.getItem("f2"),
        f3: localStorage.getItem("f3"),
        f4: localStorage.getItem("f4"),
        f5: localStorage.getItem("f5"),
        f1loc: localStorage.getItem("f1loc"),
        f2loc: localStorage.getItem("f2loc"),
        f3loc: localStorage.getItem("f3loc"),
        f4loc: localStorage.getItem("f4loc"),
        f5loc: localStorage.getItem("f5loc"),
        loading: false
      });
    });
  };

  getFrontAdminsData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios.get(`/companyadmins`, config).then(response => {
      const frontadminData = response.data;

      const isolatekey = parseInt(localStorage.getItem("admin_id"), 10);

      // Array with object containing details of the logged user

      const adminsArray = frontadminData.filter(object => object.admin_id === isolatekey);

      this.setState({
        fadmins: adminsArray,
        loading: false
      });
    });
  };

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const fadminid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", fadminid);

    history.push("/adminedit");
    this.setState({ loading: false });
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/admin");
    this.setState({ loading: false });
  };

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const fadminid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", fadminid);

    // Delete selected front admin record
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.delete(`/companyadmins/${fadminid}`, config).then(
      response => {
        if (response) {
          history.push("/admin");
        }
        this.setState({ loading: false });
      },
      error => {
        throw error;
      }
    );
  };

  render() {
    // eslint-disable-next-line camelcase
    const {
      admin_id,
      fadmins,
      errors,
      f1,
      f2,
      f3,
      f4,
      f5,
      f1loc,
      f2loc,
      f3loc,
      f4loc,
      f5loc,
      loading
    } = this.state;
    const company = localStorage.getItem("company");
    const newLocal = ConstCoAdmin();

    const companyStaff = fadmins.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="fadmin">{index + 1}</td>
          <td className="fadmin">{item.front_office_id}</td>
          <td className="fadmin">{item.firstname}</td>
          <td className="fadmin">{item.lastname}</td>
          <td className="fadmin">{item.staff_id}</td>
          <td className="fadmin">{item.email}</td>
          <td className="fadmin">{item.role}</td>
          <td className="fadmin">{item.location}</td>
        </tr>
      );
    });

    const { activePage, itemCountPerPage } = this.state;
    // Get current items
    const indexOfLastItem = activePage * itemCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
    const currentItems = companyStaff.slice(indexOfFirstItem, indexOfLastItem);

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
                <div className="col-sm">
                  <h6>{company}:Entry Pad</h6>
                  <main>
                    <form noValidate onSubmit={this.onSubmit}>
                      <fieldset className="front-fieldset">
                        <fieldset disabled className="admin-fieldset hide">
                          <div className="form-group row">
                            <label
                              htmlFor="adminId"
                              className="col-sm-2 col-form-label col-form-label-sm"
                            >
                              Admin:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="decimal"
                                name="admin_id"
                                id="adminId"
                                className="form-control"
                                placeholder="Disabled input"
                                // eslint-disable-next-line camelcase
                                value={admin_id}
                                aria-describedby="adminIdInput"
                              />
                            </div>
                          </div>
                        </fieldset>
                        <h6>Front Admin Details</h6>
                        <div className="form-group row">
                          <label
                            htmlFor="frontOfficeId"
                            className="col-sm-2 col-form-label col-form-label-sm"
                          >
                            Office-Id:
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="decimal"
                              name="front_office_id"
                              className="form-control form-control-sm"
                              id="frontOfficeId"
                              placeholder="Enter Front-office-id"
                              aria-describedby="frontOfficeIdInput"
                              aria-required="true"
                              aria-invalid="false"
                              ref={this.input}
                            />
                            <span className="col-sm-2 col-form-label col-form-label-sm">
                              <i className="adminlocation">
                                id &apos;s: {f1}-{f1loc},{f2}-{f2loc},{f3}-{f3loc},{f4}-{f4loc},{f5}
                                -{f5loc}
                              </i>
                            </span>
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

                          <label
                            htmlFor="role"
                            className="col-sm-2 col-form-label col-form-label-sm"
                          >
                            Role:
                          </label>
                          <div className="col-sm-10">
                            <CoAdminRole onChange={this.onChange} />
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
                          </div>

                          <label
                            htmlFor="location"
                            className="col-sm-2 col-form-label col-form-label-sm"
                          >
                            Location:
                          </label>
                          <div className="col-sm-10">
                            <CoLocation onChange={this.onChange} />
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
                  </main>
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
                  <h6>Staff details</h6>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Office-id</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Staff_id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Location</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>
              <Pagination
                itemCountPerPage={itemCountPerPage}
                totalItems={companyStaff.length}
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
CompanyAdminCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminCreate;
