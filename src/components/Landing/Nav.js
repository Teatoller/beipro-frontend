import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import "../css/styles.css";
import Can from "../Can";
import Logout from "../Auth/Logout";

class Nav extends PureComponent {
  constructor() {
    super();

    this.state = {
      role: "",
      roleAdmin: ""
    };
  }

  componentDidMount() {
    this.getAdminRole();
    this.getFrontAdminRole();
  }

  // Get admin role

  getAdminRole = () => {
    try {
      axios.get(`/combineadmins`, {}).then(response => {
        const adminsRoledata = response.data;

        const loggedUserEmail = localStorage.getItem("email");

        // Array with object containing details of the logged user

        const userArray = adminsRoledata.filter(object => object.email === loggedUserEmail);

        // Object containing detail of logged user
        const userObj = userArray[0];

        // Key
        function adminRolekey() {
          if (userObj) {
            const adminRole = userObj.role;

            return adminRole;
          }
        }

        const rolekey = adminRolekey();

        this.setState({ roleAdmin: rolekey });
        localStorage.setItem("roleAdmin", rolekey);
      });
    } catch (error) {
      throw error;
    }
  };

  // Get Front Admin role

  getFrontAdminRole = () => {
    try {
      axios.get(`/frontadmins`, {}).then(response => {
        const adminsRoledata = response.data;

        const loggedUserEmail = localStorage.getItem("email");

        // Array with object containing details of the logged user

        const userArray = adminsRoledata.filter(object => object.email === loggedUserEmail);

        // Object containing detail of logged user
        const userObj = userArray[0];

        // Key
        function fadminRolekey() {
          if (userObj) {
            const adminRole = userObj.role;

            return adminRole;
          }
        }

        const rolekey = fadminRolekey();

        this.setState({ role: rolekey });
        localStorage.setItem("role", rolekey);
      });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { role, roleAdmin } = this.state;
    return (
      <div>
        <header className="header">
          <NavLink to="/welcome" className="logo">
            Beipro
          </NavLink>

          <div className="header-right">
            <NavLink className="menu" to="/depots">
              Depots
            </NavLink>
            <Can
              role={roleAdmin}
              perform="company-admin:list"
              yes={() => (
                <NavLink className="menu" to="/admin">
                  Admin
                </NavLink>
              )}
            />
            <Can
              role={role}
              perform="front-admin:list"
              yes={() => (
                <NavLink className="menu" to="/fadmin">
                  Front-Admin
                </NavLink>
              )}
            />
            <NavLink className="menu" to="/profile">
              Profile
            </NavLink>
            <NavLink className="menu" to="#">
              <Logout />
            </NavLink>
            {/* <Logout /> */}
          </div>
        </header>
      </div>
    );
  }
}

export default Nav;
