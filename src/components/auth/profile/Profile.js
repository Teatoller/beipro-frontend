import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import "../../css/site.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstname: "",
      lastname: "",
      email: "",
      avatarUrl: ""
    };
  }

  componentDidMount() {
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

        localStorage.setItem("firstname", res.data.firstname);
        localStorage.setItem("lastname", res.data.lastname);
        localStorage.setItem("avatarUrl", res.data.avatar_url);
        this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          avatarUrl: data.avatar_url,
          loading: false
        });

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

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/depots");
    this.setState({ loading: false });
  };

  render() {
    const { firstname, lastname, email, avatarUrl, loading } = this.state;

    return (
      <div>
        <Nav />
        <div className="container">
          <span>{loading ? <Spinner /> : null}</span>
          <div className="my-2">
            <img
              className="rounded-circle mx-auto d-block profile-img"
              src={avatarUrl}
              alt="avatar"
            />
          </div>
          <div className="text-center">
            <Link className="btn btn-sm btn-success" to="/profileimg">
              <small>Click to Upload/Change Image</small>
            </Link>
          </div>
          <hr />

          <table className="table-sm mx-auto table-hover w-50 table-striped">
            <tbody>
              <tr className="">
                <th className="p-2" scope="col">
                  Name:
                </th>
                <td className="p-2 text-capitalize">
                  {firstname} {lastname}
                </td>
              </tr>
              <tr className="">
                <th className="p-2 " scope="col">
                  Email:
                </th>
                <td className="p-2 ">{email}</td>
              </tr>
            </tbody>
          </table>
          <div className="row justify-content-center">
            <div className="col-1-sm m-2">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={this.handleEditClick}
              >
                Edit
              </button>
            </div>
            <div className="col-1-sm m-2">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={this.handleCancelClick}
              >
                Home
              </button>
            </div>
          </div>
          <hr />
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
