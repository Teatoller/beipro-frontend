/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";
import ConstCoAdmin from "./ConstCoAdmin";
import UnAuthorized from "../auth/common/UnAuthorized";
import CancelBtn from "../SuperAdmin/common/CancelBtn";
import BearerToken from "../../services/BearerToken";

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

    const config = BearerToken();

    axios
      .post(`/companyadmins`, data, config)
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

  getOfficeData = () => {
    const adminId = localStorage.getItem("admin_id");
    const lockey = parseInt(adminId, 10);

    this.setState({ admin_id: lockey });
  };

  getFrontAdminsData = () => {
    const fadminid = localStorage.getItem("fadminid");

    const config = BearerToken();

    axios.get(`/companyadmins/${fadminid}`, config).then(response => {
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

    const config = BearerToken();

    axios.delete(`/companyadmins/${fadminid}`, config).then(
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
          <td className="fadmin text-center">
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

    return (
      <div>
        <Nav />
        {newLocal ? (
          <>
            <div className="container">
              <div className="row mx-auto">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h5 className="text-secondary">{company}:Staff details</h5>
                  <div className="alert alert-danger" role="alert">
                    <strong>Warning! </strong>Are you sure that you want to delete this record?
                  </div>
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
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>{companyStaff}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div>
                <CancelBtn handleCancelClick={this.handleCancelClick} />
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
CompanyAdminDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminDelete;
