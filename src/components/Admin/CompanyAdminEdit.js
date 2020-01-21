/* eslint-disable camelcase */
import React, { PureComponent } from "react";
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

    axios.patch(`/companyadmins/${fadminid}`, data).then(
      response => {
        history.push("/admin")
      },
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
        <tr key={item.index}>
          <td>{index + 1}</td>
          <td>{item.front_office_id}</td>
          <td>{item.firstname}</td>
          <td>{item.staff_id}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
          <td>{item.id}</td>
          {/* <td>{item.location_code}</td> */}
        </tr>
      );
    });

    return (
      <div>
        <Nav />
        <main>
          <div id="main-div">
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
                        placeholder={front_office_id}
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
                        placeholder={firstname}
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
                        placeholder={lastname}
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
                        placeholder={email}
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
                        placeholder={role}
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
                        placeholder={staff_id}
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="location_code">
                      Location:
                      <input
                        type="text"
                        name="location_code"
                        id="location_code"
                        placeholder={location_code}
                        onChange={this.onChange}
                      />
                    </label>
                  </div>
                  <div>
                    <input 
                    type="submit" 
                    value="Edit" 
                    />
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
export default CompanyAdminEdit;
