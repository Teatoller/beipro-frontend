/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import "../css/styles.css";
import Nav from "../Landing/Nav";

class CompanyAdminEdit extends PureComponent {
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
    this.adminData = setTimeout(() => this.getFrontAdminsData(), 300);
    this.fadminData = setTimeout(() => this.getFrontAdminData(), 300);
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

    // Get selected frontadmin and update state with new changes

    const fadminid = localStorage.getItem("fadminid");
    const { history } = this.props;

    axios
      .patch(`/companyadmins/${fadminid}`, data)
      .then(response => {
        if (response) {
          history.push("/admin");
        }
      })
      .catch(error => {
        console.log(error);
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

  // Get selected front admin detail and display in placeholder

  getFrontAdminData = () => {
    const fadminid = localStorage.getItem("fadminid");
    try {
      axios.get(`/companyadmins/${fadminid}`, {}).then(response => {
        const selectedFadminData = response.data;

        const adminObj = selectedFadminData[0];

        this.setState({
          front_office_id: adminObj.front_office_id,
          firstname: adminObj.firstname,
          lastname: adminObj.lastname,
          staff_id: adminObj.staff_id,
          email: adminObj.email,
          role: adminObj.role,
          location_code: adminObj.location_code
        });
      });
    } catch (error) {
      throw error;
    }
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
      location_code
    } = this.state;

    const companyStaff = fadmins.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.front_office_id}</td>
          <td>{item.firstname}</td>
          <td>{item.lastname}</td>
          <td>{item.staff_id}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
          <td>{item.location_code}</td>
        </tr>
      );
    });

    return (
      <div>
        <Nav />
        <main>
          <div id="main-div">
            <div id="left">
              <h6>Edit Entry Pad</h6>
              <form noValidate onSubmit={this.onSubmit}>
                <fieldset className="front-fieldset">
                  <fieldset disabled className="admin-fieldset">
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
                          className="form-control"
                          placeholder="Disabled input"
                          // eslint-disable-next-line camelcase
                          value={admin_id}
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
                      Front Office Id:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="front_office_id"
                        className="form-control form-control-sm"
                        id="frontOfficeId"
                        placeholder={front_office_id}
                        onChange={this.onChange}
                      />
                    </div>

                    <label htmlFor="lastName" className="col-sm-2 col-form-label col-form-label-sm">
                      Firstname:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="firstname"
                        className="form-control form-control-sm"
                        id="firstname"
                        placeholder={firstname}
                        onChange={this.onChange}
                      />
                    </div>

                    <label htmlFor="lastName" className="col-sm-2 col-form-label col-form-label-sm">
                      Lastname:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="lastname"
                        className="form-control form-control-sm"
                        id="lastname"
                        placeholder={lastname}
                        onChange={this.onChange}
                      />
                    </div>

                    <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-sm">
                      Email:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-sm"
                        id="email"
                        placeholder={email}
                        onChange={this.onChange}
                      />
                    </div>

                    <label htmlFor="role" className="col-sm-2 col-form-label col-form-label-sm">
                      Role:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="role"
                        className="form-control form-control-sm"
                        id="role"
                        placeholder={role}
                        onChange={this.onChange}
                      />
                    </div>

                    <label htmlFor="staffId" className="col-sm-2 col-form-label col-form-label-sm">
                      Staff Id:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="staff_id"
                        className="form-control form-control-sm"
                        id="staffId"
                        placeholder={staff_id}
                        onChange={this.onChange}
                      />
                    </div>

                    <label htmlFor="location" className="col-sm-2 col-form-label col-form-label-sm">
                      Location:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="location_code"
                        className="form-control form-control-sm"
                        id="location"
                        placeholder={location_code}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div>
                    <input className="btn btn-sm btn-success" type="submit" value="Change" />
                  </div>
                </fieldset>
              </form>
            </div>
            <div id="right">
              <h6>Staff details</h6>
              <div className="table-responsive">
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
                    </tr>
                  </thead>
                  <tbody>{companyStaff}</tbody>
                </table>
              </div>
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
CompanyAdminEdit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminEdit;
