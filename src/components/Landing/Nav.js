import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import Can from "../Can";
import "../css/style.css";
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="logo" to="/welcome">
          Beipro
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link active" to="/depots">
              Depots<span className="sr-only">(current)</span>
            </NavLink>
            <Can
              role={roleAdmin}
              perform="company-admin:list"
              yes={() => (
                <NavLink className="nav-item nav-link" to="/admin">
                  Admin
                </NavLink>
              )}
            />
            <Can
              role={role}
              perform="front-admin:list"
              yes={() => (
                <NavLink className="nav-item nav-link" to="/fadmin">
                  Front-admin
                </NavLink>
              )}
            />
            <NavLink className="nav-item nav-link" to="/profile">
              Profile
            </NavLink>
            <NavLink className="nav-item nav-link" to="#">
              <Logout />
            </NavLink>
            <NavLink className="nav-item nav-link disabled" to="#" tabindex="-1" aria-disabled="true">
              Disabled
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
