import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import UnAuthorized from "../../auth/common/UnAuthorized";
import ConstSAdmin from "../ConstSAdmin";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      admins: [],
      activePage: "1",
      itemCountPerPage: "10"
    };
  }

  componentDidMount() {
    this.getAdminsData();
  }

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

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);
    history.push("/sadmindelete");
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
              className="btn btn-sm btn-primary"
              type="button"
              sadminid={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="admin text-center">
            <button
              className="btn btn-sm btn-outline-danger"
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

    return (
      <div>
        <Nav />
        {newLocal ? (
          <>
            {" "}
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h5 className="text-secondary">Admin details</h5>
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
                          <th scope="col">Action</th>
                          <th scope="col">Remove</th>
                        </tr>
                      </thead>
                      <tbody>{currentItems}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <span className="font-italic form-text text-muted">
                Click button to add a new Admin
              </span>
              <div className="m-1">
                <button
                  className="btn btn-sm btn-success"
                  type="submit"
                  onClick={this.handleCreateClick}
                >
                  Add
                </button>
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
Admin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Admin;
