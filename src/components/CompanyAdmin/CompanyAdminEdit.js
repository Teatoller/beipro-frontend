/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";
import Pagination from "../Pagination";
import ConstCoAdmin from "./ConstCoAdmin";
import UnAuthorized from "../auth/common/UnAuthorized";
import EditBtn from "../SuperAdmin/common/EditBtn";

class CompanyAdminEdit extends PureComponent {
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
      location: "",
      fadmins: [],
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
  }

  componentDidMount() {
    this.getOfficeData();
    this.adminData = setTimeout(() => this.getFrontAdminsData(), 500);
    this.fadminData = setTimeout(() => this.getFrontAdminData(), 500);
  }

  componentWillUnmount() {
    clearTimeout(this.adminData);
    clearTimeout(this.fadminData);
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
      location
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
      location
    };

    // Get selected frontadmin and update state with new changes

    const fadminid = localStorage.getItem("fadminid");
    const { history } = this.props;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios
      .patch(`/companyadmins/${fadminid}`, data, config)
      .then(response => {
        if (response) {
          history.push("/admin");
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
      });
  };

  getOfficeData = () => {
    const adminId = localStorage.getItem("admin_id");
    const lockey = parseInt(adminId, 10);

    this.setState({ admin_id: lockey });
  };

  getFrontAdminsData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios.get(`/companyadmins`, config).then(response => {
      const adminsArray = response.data;

      this.setState({
        fadmins: adminsArray,
        loading: false
      });
    });
  };

  // Get selected front admin detail and display in placeholder

  getFrontAdminData = () => {
    const fadminid = localStorage.getItem("fadminid");
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios.get(`/companyadmins/${fadminid}`, config).then(response => {
      const selectedFadminData = response.data;

      const adminObj = selectedFadminData[0];

      this.setState({
        front_office_id: adminObj.front_office_id,
        firstname: adminObj.firstname,
        lastname: adminObj.lastname,
        staff_id: adminObj.staff_id,
        email: adminObj.email,
        role: adminObj.role,
        location: adminObj.location,
        loading: false
      });
    });
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/admin");
    this.setState({ loading: false });
  };

  render() {
    // eslint-disable-next-line camelcase
    const {
      admin_id,
      fadmins,
      front_office_id,
      firstname,
      lastname,
      staff_id,
      email,
      role,
      location,
      errors,
      loading
    } = this.state;

    const company = localStorage.getItem("company");
    const newLocal = ConstCoAdmin();

    const companyStaff = fadmins.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="fadmin text-center">{index + 1}</td>
          <td className="fadmin text-center">{item.front_office_id}</td>
          <td className="fadmin text-center">{item.firstname}</td>
          <td className="fadmin text-center">{item.lastname}</td>
          <td className="fadmin text-center">{item.staff_id}</td>
          <td className="fadmin text-center">{item.email}</td>
          <td className="fadmin text-center">{item.role}</td>
          <td className="fadmin text-center">{item.location}</td>
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
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm-6 m-auto">
                  <h5 className="text-secondary">{company}:Edit Entry Pad</h5>
                  <main>
                    <form noValidate onSubmit={this.onSubmit}>
                      <fieldset>
                        <fieldset disabled className="hide invisible">
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
                                className="form-control form-control-sm"
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
                            Office Id:
                          </label>
                          <div className="col-sm-10 mb-1">
                            <input
                              type="decimal"
                              name="front_office_id"
                              className="form-control form-control-sm"
                              id="frontOfficeId"
                              placeholder={front_office_id}
                              onChange={this.onChange}
                              aria-describedby="forntOfficeIdInput"
                              readOnly
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
                              placeholder={firstname}
                              onChange={this.onChange}
                              aria-describedby="firstnameInput"
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
                              placeholder={lastname}
                              onChange={this.onChange}
                              aria-describedby="lastnameInput"
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
                              placeholder={email}
                              onChange={this.onChange}
                              aria-describedby="emailInput"
                            />
                          </div>

                          <label
                            htmlFor="role"
                            className="col-sm-2 col-form-label col-form-label-sm"
                          >
                            Role:
                          </label>
                          <div className="col-sm-10 mb-1">
                            <input
                              type="text"
                              name="role"
                              className="form-control form-control-sm"
                              id="role"
                              placeholder={role}
                              onChange={this.onChange}
                              aria-describedby="roleInput"
                              readOnly
                            />
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
                              placeholder={staff_id}
                              onChange={this.onChange}
                              aria-describedby="staffIdInput"
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
                              onChange={this.onChange}
                              aria-describedby="locationInput"
                            />
                            <span style={errors.email ? dangerStyle : null}>
                              <Error error={errors.email ? errors.email : null} />
                            </span>
                          </div>
                        </div>
                        <span className="font-italic text-secondary">
                          Click button to change admin details
                        </span>
                        <div className="row">
                          <EditBtn handleCancelClick={this.handleCancelClick} />
                        </div>
                      </fieldset>
                    </form>
                  </main>
                </div>
                <div className="col-sm-6 mx-auto">
                  <h5 className="text-secondary">Staff details</h5>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover table-bordered text-secondary">
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
              </div>
              <div className="fixed-bottom mb-3">
                <Pagination
                  itemCountPerPage={itemCountPerPage}
                  totalItems={companyStaff.length}
                  paginate={paginate}
                />
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
CompanyAdminEdit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminEdit;
