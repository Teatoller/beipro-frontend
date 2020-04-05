import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";
import profileholder from "../../images/profileholder.png";
import "../css/depot.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstname: "",
      lastname: "",
      email: "",
      avatarUrl: profileholder
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios
      .get(`/auth/profile`, config)
      .then(res => {
        // eslint-disable-next-line prefer-destructuring
        const data = res.data;
        localStorage.setItem("firstname", res.data.firstname);
        localStorage.setItem("lastname", res.data.lastname);
        localStorage.setItem("avatarUrl", res.data.avatar_url);
        this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          avatar: data.avatar,
          avatarUrl: data.avatar_url,
          loading: false
        });
      })
      .catch(error => {
        throw error;
      });
  }

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    history.push("/profileedit");
  };

  render() {
    const { firstname, lastname, email, avatarUrl, avatar, loading } = this.state;

    return (
      <div>
        <Nav />
        <div className="container profile-page">
          <span>{loading ? <Spinner /> : null}</span>
          {/* <h6>Profile</h6> */}
          {/* <div>
            <img className="rounded-circle profile-img" src={avatar} alt="Avatar" />
          </div>
          <br/> */}

          <div>
            <img
              className="rounded-circle profile-img"
              src={avatarUrl}
              height="180"
              width="180"
              alt="Avatar"
            />
          </div>
          <small className="form-text text-muted img-text">
            <Link to="profileimg">Click to Upload/Change Image</Link>
          </small>
          <br />
          <hr />

          <table className="table table-striped profile-page">
            <tbody>
              <tr className="d-flex flex-row bd-highlight mb-2">
                <th className="p-2 bd-highlight" scope="col">
                  Name:
                </th>
                <td className="p-2 bd-highlight">
                  {firstname} {lastname}
                </td>
              </tr>
              <tr className="d-flex flex-row bd-highlight mb-2">
                <th className="p-2 bd-highlight" scope="col">
                  Email:
                </th>
                <td className="p-2 bd-highlight">{email}</td>
              </tr>
            </tbody>
          </table>
          <div className="btn-spacing">
            <button type="button" className="btn btn-sm btn-primary" onClick={this.handleEditClick}>
              Edit
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Profile.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Profile;
