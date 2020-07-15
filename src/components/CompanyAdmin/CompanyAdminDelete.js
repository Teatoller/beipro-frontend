/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";

class CompanyAdminDelete extends Component {
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
      fadmins: []
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

    const { history } = this.props;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios
      .post(`/auth/companyadmins`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/admin`), 50);
        }
        this.setState({ loading: false });
      })
      .catch(err => {
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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios.get(`/auth/combineadmins`, config).then(response => {
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

      this.setState({ admin_id: lockey });
      localStorage.setItem("admin_id", lockey);
    });
  };

  getFrontAdminsData = () => {
    const fadminid = localStorage.getItem("fadminid");
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.get(`/auth/companyadmins/${fadminid}`, config).then(response => {
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

    axios.delete(`/auth/companyadmins/${fadminid}`, config).then(
      response => {
        if (response) {
          history.push("/admin");
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

    history.push("/admin");
    this.setState({ loading: false });
  };

  render() {
    const { fadmins, loading } = this.state;
    const company = localStorage.getItem("company");

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
          <td className="fadmin">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              fadminid={item.id}
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
              <h6>{company}:Staff details</h6>
              <span style={dangerStyle}>Are you sure that you want to Delete this record?</span>
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
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>{companyStaff}</tbody>
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
CompanyAdminDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminDelete;
