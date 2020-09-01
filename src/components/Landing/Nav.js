/* eslint-disable consistent-return */
import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import Can from "../Can";
import "../css/site.css";
import Logout from "../auth/logout/Logout";
import BearerToken from "../../services/BearerToken";

class Nav extends PureComponent {
  constructor() {
    super();

    this.state = {
      role: "",
      roleAdmin: "",
      roleSadmin: "",
      avatarUrl: "",
      firstname: ""
    };
  }

  componentDidMount() {
    this.getRole();
    this.getImageUrl();
  }

  // Get role

  getRole = () => {
    const config = BearerToken();
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
          avatarUrl: data.avatar_url,
          firstname: data.firstname
          // loading: false
        });
        //
        if (!data.avatar_url === "profileholder.svg") {
          this.setState({
            avatarUrl: localStorage.getItem("avatarUrl")
          });
        }
        if (data.avatar_url === "profileholder.svg") {
          const profileUrl = `./img/${res.data.avatar_url}`;
          this.setState({
            avatarUrl: profileUrl
          });
        }
        //
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const { role, roleAdmin, roleSadmin, avatarUrl, firstname } = this.state;
    const activeStyle = { color: "#f0a243" };
    const logoUrl = `./img/beipro.svg`;
    return (
      <nav className="navbar navbar-expand-sm navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/welcome">
            <img
              src={logoUrl}
              width="30"
              height="30"
              className="d-inline-block align-top p-1"
              alt=""
              loading="lazy"
            />
            <span className="font-weight-bold text-secondary">Beipro</span>
          </NavLink>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav text-capitalize ml-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" activeStyle={activeStyle} to="/depots">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <Can
                  role={roleAdmin}
                  perform="company-admin:list"
                  yes={() => (
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/admin">
                      Admin |
                    </NavLink>
                  )}
                />
              </li>
              <li className="nav-item">
                <Can
                  role={role}
                  perform="front-admin:list"
                  yes={() => (
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/fadmin">
                      Staff |
                    </NavLink>
                  )}
                />
              </li>
              <li className="nav-item">
                <Can
                  role={roleSadmin}
                  perform="admin:list"
                  yes={() => (
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/sadmin">
                      Admins |
                    </NavLink>
                  )}
                />
              </li>
              <li className="nav-item">
                <Can
                  role={roleSadmin}
                  perform="company:list"
                  yes={() => (
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/company">
                      Companies
                    </NavLink>
                  )}
                />
              </li>
              <li className="nav-item">
                <Can
                  role={roleSadmin}
                  perform="front-office:list"
                  yes={() => (
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/frontoffice">
                      Front-offices
                    </NavLink>
                  )}
                />
              </li>
              <li className="nav-item">
                <Can
                  role={roleSadmin}
                  perform="audit:list"
                  yes={() => (
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/audit">
                      Audits
                    </NavLink>
                  )}
                />
              </li>
              <li className="nav-item">
                <Can
                  role={roleSadmin}
                  perform="feedback:list"
                  yes={() => (
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/feedback">
                      Feedbacks
                    </NavLink>
                  )}
                />
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle text-capitalize"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="text-muted">{firstname}</span>{" "}
                  <img
                    src={avatarUrl}
                    className="d-inline-block align-top rounded-circle nav-img"
                    alt=""
                  />
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="/profile">
                    Profile
                  </NavLink>
                  <NavLink className="dropdown-item" to="/contactus">
                    Contact Us
                  </NavLink>
                  <div className="dropdown-divider" />
                  <NavLink className="dropdown-item" to="#">
                    <span className="dropdown-item rounded bg-light text-center">
                      <Logout />
                    </span>
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
