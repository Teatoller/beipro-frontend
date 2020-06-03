import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";
import Pagination from "../Pagination";

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
    this.getadminssData();
    this.getFofficeData();
  }

  componentWillUnmount() {
    clearTimeout(this.adminData);
  }

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
  };

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/admincreate");
  };

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const fadminid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", fadminid);

    history.push("/admindelete");
  };

  // experiment

  // phase 1 Establish the company id
  getadminssData = () => {
    axios.get(`/admins`, {}).then(response => {
      const adminssData = response.data;
      const loggedUserEmail = localStorage.getItem("email");

      // Array with object containing details of the logged user

      const userArray = adminssData.filter(object => object.email === loggedUserEmail);

      // Object containing detail of logged user
      const adminObj = userArray[0];

      // Key
      // eslint-disable-next-line consistent-return
      function compkey() {
        if (adminObj) {
          const compId = adminObj.company_id;

          return compId;
        }
      }

      const companyId = parseInt(compkey(), 10);

      localStorage.setItem("company_id", companyId);
    });
  };

  // phase 2 Establish the company front offices id's

  getFofficeData = () => {
    axios.get(`/frontoffices`, {}).then(response => {
      const fofficesData = response.data;

      const AdminxCompanyId = localStorage.getItem("company_id");

      const AdminCompanyId = parseInt(AdminxCompanyId, 10);

      // Array with object containing details of the logged user

      const officesArray = fofficesData.filter(object => object.company_id === AdminCompanyId);

      // Object containing detail of logged user
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

  // end experiment

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
          <td className="fadmin">{item.location_code}</td>
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

        <Footer />
      </div>
    );
  }
}
CompanyAdmin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdmin;
