import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";
import Pagination from "../Pagination";
import ConstCoAdmin from "./ConstCoAdmin";
import UnAuthorized from "../auth/common/UnAuthorized";

class CompanyAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fadmins: [],
      activePage: "1",
      itemCountPerPage: "5"
    };
  }

  componentDidMount() {
    this.getOfficeData();
    this.adminData = setTimeout(() => this.getFrontAdminsData(), 1500);
    this.getFofficeData();
  }

  componentWillUnmount() {
    clearTimeout(this.adminData);
  }

  getOfficeData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.get(`/combineadmins`, config).then(response => {
      const adminsdata = response.data;

      const adminId = adminsdata.id;
      const companyId = adminsdata.company_id;

      const lockey = parseInt(adminId, 10);

      const lockey2 = parseInt(companyId, 10);

      localStorage.setItem("admin_id", lockey);

      localStorage.setItem("company_id", lockey2);
    });
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

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const fadminid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", fadminid);

    history.push("/adminedit");
  };

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/admincreate");
  };

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const fadminid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", fadminid);

    history.push("/admindelete");
  };

  getFofficeData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios.get(`/frontshores`, config).then(response => {
      const officesArray = response.data;

      if (officesArray[0]) {
        localStorage.setItem("f1", officesArray[0].id);
        localStorage.setItem("f1loc", officesArray[0].location);
        localStorage.setItem("company", officesArray[0].name);
      }
      if (officesArray[1]) {
        localStorage.setItem("f2", officesArray[1].id);
        localStorage.setItem("f2loc", officesArray[1].location);
      }
      if (officesArray[2]) {
        localStorage.setItem("f3", officesArray[2].id);
        localStorage.setItem("f3loc", officesArray[2].location);
      }
      if (officesArray[3]) {
        localStorage.setItem("f4", officesArray[3].id);
        localStorage.setItem("f4loc", officesArray[3].location);
      }
      if (officesArray[4]) {
        localStorage.setItem("f5", officesArray[4].id);
        localStorage.setItem("f5loc", officesArray[4].location);
      }
    });
  };

  render() {
    const { fadmins, loading } = this.state;
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
          <td className="fadmin">
            <button
              className="btn btn-sm btn-primary"
              type="button"
              fadminid={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="fadmin">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              fadminid={item.id}
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
    const currentItems = companyStaff.slice(indexOfFirstItem, indexOfLastItem);

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
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h6>{company}:Staff details</h6>
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
                        <th scope="col">Action</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>

              <span>Click button to add a new Front Office Admin</span>

              <div className="btn-spacing">
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
CompanyAdmin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdmin;
