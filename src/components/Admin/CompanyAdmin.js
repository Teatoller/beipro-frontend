/* eslint-disable camelcase */
import React, { Component } from "react";
import axios from "../../axios";
import "../css/styles.css";
import Dropdown from "../Menu/Dropdown";

class CompanyAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_id: "",
      front_office_id: "",
      firstname: "",
      lastname: "",
      staff_id: "",
      email: "",
      role: "",
      location_code: "",
      fadmins: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getOfficeData();
    this.getFrontAdminsData();
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

    axios.post(`/companyadmins`, data).then(
      response => {},
      error => {
        console.log(error);
      }
    );
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
    try {
      axios.get(`/combineadmins`, {}).then(response => {
        const adminsdata = response.data;
        const loggedUserEmail = localStorage.getItem("email");

        // Array with object containing details of the logged user

        const userArray = adminsdata.filter(object => object.email === loggedUserEmail);

        // Object containing detail of logged user
        const userObj = userArray[0];

        // Key
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
    } catch (error) {
      throw error;
    }
  };

  getFrontAdminsData = () => {
    try {
      axios.get(`/companyadmins`, {}).then(response => {
        const frontadminData = response.data;

        const isolatekey = parseInt(localStorage.getItem("admin_id"), 10);

        // Array with object containing details of the logged user

        const adminsArray = frontadminData.filter(object => object.admin_id === isolatekey);

        this.setState({ fadmins: adminsArray });
      });
    } catch (error) {
      throw error;
    }
  };

  render() {
    // eslint-disable-next-line camelcase
    const { admin_id, fadmins } = this.state;

    const companyStaff = fadmins.map((item, index) => {
      return (
        <tr key={item.index}>
          <td>{index + 1}</td>
          <td>{item.front_office_id}</td>
          <td>{item.firstname}</td>
          <td>{item.staff_id}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
          <td>{item.location_code}</td>
          <td>
            <button type="submit">Edit</button>
          </td>
          <td>
            <button type="submit">Delete</button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <header className="header">
          <a href="/landing" className="logo">
            Beipro
          </a>
          <div className="header-right">
            <a href="#about">Logout</a>
          </div>
        </header>
        <main>
          <div id="main-div">
            <Dropdown />
            <div id="left">
              <form noValidate onSubmit={this.onSubmit}>
                <fieldset disabled className="front-fieldset">
                  <legend>Company Admin</legend>
                  <div className="form-ex ample">
                    <label htmlFor="admin_id">
                      Admin Id:
                      <input
                        type="decimal"
                        name="admin_id"
                        id="admin_id"
                        style={{ color: "red" }}
                        // eslint-disable-next-line camelcase
                        value={admin_id}
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="front-fieldset">
                  <legend>Front Admin Details</legend>
                  <div>
                    <label htmlFor="front_office_id">
                      Front Office Id:
                      <input
                        type="decimal"
                        name="front_office_id"
                        id="front_office_id"
                        placeholder="Enter Front-office-id"
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="firstname">
                      Firstname:
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter Front-admin Firstname"
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="lastname">
                      Lastname:
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter Front-admin Lastname"
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="email">
                      Email:
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Front-admin Email"
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="role">
                      Role:
                      <input
                        type="text"
                        name="role"
                        id="role"
                        placeholder="Enter Role as staff"
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="staff_id">
                      Staff Id:
                      <input
                        type="decimal"
                        name="staff_id"
                        id="staff_id"
                        placeholder="Enter Front-admin Staff-id"
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="location_code">
                      Location Code:
                      <input
                        type="text"
                        name="location_code"
                        id="location_code"
                        placeholder="Enter Front-office location-code"
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <input type="submit" value="Add" />
                    {/* <input type="submit" value="Edit" /> */}
                  </div>
                </fieldset>
              </form>
            </div>
            <div id="right">
              <h3>Staff details</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Front-office-id</th>
                    <th>Firstname</th>
                    <th>Staff_id</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Action</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>{companyStaff}</tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className="footer-register">
          <span>Beipro &copy;2018</span>
        </footer>
      </div>
    );
  }
}
export default CompanyAdmin;
