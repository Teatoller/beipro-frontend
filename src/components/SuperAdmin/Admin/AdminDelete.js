import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import UnAuthorized from "../../auth/common/UnAuthorized";
import ConstSAdmin from "../ConstSAdmin";
import CancelBtn from "../common/CancelBtn";
import BearerToken from "../../../services/BearerToken";

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
    const config = BearerToken();

    axios.get(`/admins/${sadminid}`, config).then(response => {
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
    const config = BearerToken();

    axios.delete(`/admins/${sadminid}`, config).then(
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
          <td className="admin text-center">
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

    return (
      <div>
        <Nav />
        {newLocal ? (
          <>
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h5 className="text-secondary">Admin details</h5>
                  <div className="alert alert-danger" role="alert">
                    <strong>Warning! </strong>Are you sure that you want to delete this record?
                  </div>
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
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>{companyAdminStaff}</tbody>
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
AdminDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default AdminDelete;
