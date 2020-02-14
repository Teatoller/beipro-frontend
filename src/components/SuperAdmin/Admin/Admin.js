import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";

class Admin extends Component {
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
    axios.get(`/admins`, {}).then(response => {
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

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);

    // Delete selected front admin record

    axios.delete(`/admins/${sadminid}`, {}).then(
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
              className="btn btn-sm btn-success"
              type="button"
              sadminid={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="admin">
            <button
              className="btn btn-sm btn-danger"
              type="button"
              sadminid={item.id}
              onClick={this.handleDeleteClick}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Nav />

        <div className="container">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col-sm">
              <h6>Admin details</h6>
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
                    <th scope="col">Action</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>{companyAdminStaff}</tbody>
              </table>
            </div>
          </div>

          <span>Click button to add a new Admin</span>

          <div>
            <button
              className="btn btn-sm btn-success"
              type="submit"
              onClick={this.handleCreateClick}
            >
              Add
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
Admin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Admin;
