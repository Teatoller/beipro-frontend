import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";

class AdminDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      admins: []
    };
  }

  componentDidMount() {
    this.getAdminsData();
  }

  getAdminsData = () => {
    const sadminid = localStorage.getItem("sadminid");

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.get(`/auth/admins/${sadminid}`, config).then(response => {
      const adminData = response.data;
      this.setState({
        admins: adminData,
        loading: false
      });
    });
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

    axios.delete(`/auth/admins/${sadminid}`, config).then(
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

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/sadmin");
    this.setState({ loading: false });
  };

  render() {
    // eslint-disable-next-line camelcase
    const { admins, loading } = this.state;

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
          <td className="admin">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              sadminid={item.id}
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
              <h6>Admin details</h6>
              <span style={dangerStyle}>Are you sure that you want to Delete this record?</span>
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
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>{companyAdminStaff}</tbody>
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
AdminDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default AdminDelete;
