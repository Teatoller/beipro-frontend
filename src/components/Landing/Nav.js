/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import Can from "../Can";
import "../css/site.css";
import Logout from "../auth/logout/Logout";
import BearerToken from "../../services/BearerToken";

export const Nav = () => {
  const [role, setRole] = useState("");
  const [roleAdmin, setRoleAdmin] = useState("");
  const [roleSadmin, setRoleSAdmin] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [firstname, setFirstname] = useState("");

  const getRole = () => {
    const config = BearerToken();
    axios.get(`/roles`, config).then(response => {
      const roleData = response.data;

      setRole(roleData);
      setRoleAdmin(roleData);
      setRoleSAdmin(roleData);
      localStorage.setItem("roleAdmin", roleData);
      localStorage.setItem("role", roleData);
      localStorage.setItem("roleSadmin", roleData);
    });
  };

  const getImageUrl = () => {
    const config = BearerToken();
    axios
      .get(`/profile`, config)
      .then(res => {
        // eslint-disable-next-line prefer-destructuring
        const data = res.data;
        localStorage.setItem("avatarUrl", res.data.avatar_url);
        localStorage.setItem("fname", res.data.firstname);
        localStorage.setItem("lname", res.data.lastname);
        setAvatarUrl(data.avatar_url);
        setFirstname(data.firstname);

        if (!data.avatar_url === "profileholder.svg") {
          setAvatarUrl(localStorage.getItem("avatarUrl"));
        }
        if (data.avatar_url === "profileholder.svg") {
          const profileUrl = `./img/${res.data.avatar_url}`;
          setAvatarUrl(profileUrl);
        }
      })
      .catch(error => {
        throw error;
      });
  };

  useEffect(() => {
    getRole();
    getImageUrl();
  }, []);

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
                Depots <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeStyle={activeStyle} to="/graphs">
                Stats
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
};
export default Nav;
