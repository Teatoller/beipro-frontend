/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";

class CompanyAdminCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      admin_id: "",
      front_office_id: "",
      firstname: "",
      lastname: "",
      staff_id: "",
      email: "",
      role: "",
      location_code: "",
      fadmins: [],
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
    const {
      admin_id,
      front_office_id,
      firstname,
      lastname,
      staff_id,
      email,
      role,
      location_code
    } = this.state;
    e.preventDefault();
    const data = {
      admin_id,
      front_office_id,
      firstname,
      lastname,
      staff_id,
      email,
      role,
      location_code
    };

    const { history } = this.props;

    axios
      .post(`/companyadmins`, data)
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

  /**
   * Pseudo code
   *
   * Step 1:
   * Figure out the logged in user email
   *
   * Step 2:
   * Figure out the company admin id using the email and admins endpoint
   *
   * Step 3:
   * Assign to the form company and admin id input field and keep disabled
   */

  getOfficeData = () => {
    axios.get(`/combineadmins`, {}).then(response => {
      const adminsdata = response.data;
      const loggedUserEmail = localStorage.getItem("email");

      // Array with object containing details of the logged user

      const userArray = adminsdata.filter(object => object.email === loggedUserEmail);

      // Object containing detail of logged user
      const userObj = userArray[0];

      // Key
      // eslint-disable-next-line consistent-return
      function adminkey() {
        if (userObj) {
          const adminId = userObj.id;

          return adminId;
        }
      }

      const lockey = parseInt(adminkey(), 10);

      this.setState({
        admin_id: lockey,
        loading: false
      });
      localStorage.setItem("admin_id", lockey);
    });
  };

  getFrontAdminsData = () => {
    axios.get(`/companyadmins`, {}).then(response => {
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

    axios.delete(`/companyadmins/${fadminid}`, {}).then(
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
    const { admin_id, fadmins, errors, loading } = this.state;

    const companyStaff = fadmins.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.front_office_id}</td>
          <td>{item.firstname}</td>
          <td>{item.lastname}</td>
          <td>{item.staff_id}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
          <td>{item.location_code}</td>
        </tr>
      );
    });

    const dangerStyle = {
      fontStyle: "italic",
      color: "red"
    };

    return (
      <div>
        <Nav />

        <div className="container" aria-label="Create company front admin form">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col-sm">
              <h6>Entry Pad</h6>
              <form noValidate onSubmit={this.onSubmit}>
                <fieldset className="front-fieldset">
                  <fieldset disabled className="admin-fieldset">
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
                      Front Office Id:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="front_office_id"
                        className="form-control form-control-sm"
                        id="frontOfficeId"
                        placeholder="Enter Front-office-id"
                        onChange={this.onChange}
                        aria-describedby="frontOfficeIdInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="lastName" className="col-sm-2 col-form-label col-form-label-sm">
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

                    <label htmlFor="lastName" className="col-sm-2 col-form-label col-form-label-sm">
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

                    <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-sm">
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
                      <input
                        type="text"
                        name="role"
                        className="form-control form-control-sm"
                        id="role"
                        placeholder="Enter role as staff"
                        onChange={this.onChange}
                        aria-describedby="roleInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="staffId" className="col-sm-2 col-form-label col-form-label-sm">
                      Staff Id:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="staff_id"
                        className="form-control form-control-sm"
                        id="staffId"
                        placeholder="Enter Front-admin Staff Id"
                        onChange={this.onChange}
                        aria-describedby="staffIdInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="location" className="col-sm-2 col-form-label col-form-label-sm">
                      Location:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="location_code"
                        className="form-control form-control-sm"
                        id="location"
                        placeholder="Enter Front-office location"
                        onChange={this.onChange}
                        aria-describedby="locationInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                      <span style={errors.email ? dangerStyle : null}>
                        <Error error={errors.email ? errors.email : null} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <input className="btn btn-sm btn-success" type="submit" value="Create" />
                  </div>
                </fieldset>
              </form>
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
                    {/* <th scope="col">Action</th> */}
                    {/* <th scope="col">Remove</th> */}
                  </tr>
                </thead>
                <tbody>{companyStaff}</tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
CompanyAdminCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminCreate;
