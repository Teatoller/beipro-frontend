/* eslint-disable consistent-return */
import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import Can from "../Can";
import "../css/style.css";
import Logout from "../auth/logout/Logout";

class Nav extends PureComponent {
  constructor() {
    super();

    this.state = {
      role: "",
      roleAdmin: "",
      roleSadmin: "",
      avatarUrl: ""
    };
  }

  componentDidMount() {
    this.getRole();
    this.getImageUrl();

    const avatarExist = localStorage.getItem("avatarUrl");

    if (avatarExist) {
      this.setState({
        avatarUrl: localStorage.getItem("avatarUrl")
      });
    } else {
      const newLocal = `./img/profileholder.svg`;
      const profileUrl = newLocal;
      this.setState({
        avatarUrl: profileUrl
      });
    }
  }

  // Get role

  getRole = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios.get(`/roles`, config).then(response => {
      const roleData = response.data;

      this.setState({
        roleAdmin: roleData,
        role: roleData,
        roleSadmin: roleData
      });
      localStorage.setItem("roleAdmin", roleData);
      localStorage.setItem("role", roleData);
      localStorage.setItem("roleSadmin", roleData);
    });
  };

  getImageUrl = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios
      .get(`/profile`, config)
      .then(res => {
        // eslint-disable-next-line prefer-destructuring
        const data = res.data;
        localStorage.setItem("avatarUrl", res.data.avatar_url);
        localStorage.setItem("fname", res.data.firstname);
        localStorage.setItem("lname", res.data.lastname);
        this.setState({
          avatarUrl: data.avatar_url
        });
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const { role, roleAdmin, roleSadmin, avatarUrl } = this.state;
    const activeStyle = { color: "#f0a243" };
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link active" activeStyle={activeStyle} to="/depots">
              Home |<span className="sr-only">(current)</span>
            </NavLink>
            <Can
              role={roleAdmin}
              perform="company-admin:list"
              yes={() => (
                <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/admin">
                  Admin |
                </NavLink>
              )}
            />
            <Can
              role={role}
              perform="front-admin:list"
              yes={() => (
                <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/fadmin">
                  Staff |
                </NavLink>
              )}
            />
            <Can
              role={roleSadmin}
              perform="admin:list"
              yes={() => (
                <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/sadmin">
                  Admins |
                </NavLink>
              )}
            />
            <Can
              role={roleSadmin}
              perform="company:list"
              yes={() => (
                <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/company">
                  Companies
                </NavLink>
              )}
            />
            <Can
              role={roleSadmin}
              perform="front-office:list"
              yes={() => (
                <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/frontoffice">
                  Front-offices
                </NavLink>
              )}
            />
            <Can
              role={roleSadmin}
              perform="audit:list"
              yes={() => (
                <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/audit">
                  Audits
                </NavLink>
              )}
            />
            <Can
              role={roleSadmin}
              perform="feedback:list"
              yes={() => (
                <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/feedback">
                  Feedbacks
                </NavLink>
              )}
            />
            <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/profile">
              Profile |
            </NavLink>
            <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/contactus">
              Contact Us |
            </NavLink>
            <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="#">
              <Logout />
            </NavLink>
          </div>
        </div>

        <NavLink className="nav-item nav-link" activeStyle={activeStyle} to="/profile">
          <img src={avatarUrl} className="d-inline-block align-top avatar" alt="" />
        </NavLink>
      </nav>
    );
  }
}

export default Nav;
