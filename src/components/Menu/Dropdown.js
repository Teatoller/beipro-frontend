import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import axios from "../../axios";
import Can from "../Can";
import "../css/styles.css";

class Dropdown extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false,
      role: "",
      roleAdmin: ""
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
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

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    const { displayMenu, role, roleAdmin } = this.state;

    return (
      <div className="dropdown" style={{ width: "200px" }}>
        <div className="button" onClick={this.showDropdownMenu}>
          {" "}
          My Menu{" "}
        </div>
        {displayMenu ? (
          <ul>
            <li>
              <NavLink className="active" to="/depots">
                Depot Prices
              </NavLink>
            </li>
            <Can
              role={roleAdmin}
              perform="company-admin:list"
              yes={() => (
                <li>
                  <a href="/admin">Company Admin</a>
                </li>
              )}
            />
            <Can
              role={role}
              perform="front-admin:list"
              yes={() => (
                <li>
                  <a href="/fadmin">Front Office Admin</a>
                </li>
              )}
            />
            <li>
              <a href="/profile">Profile</a>
            </li>
            {/* <li> */}
            {/* <NavLink to="/">Logout</NavLink> */}
            {/* <Logout /> */}
            {/* </li> */}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
