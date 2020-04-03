import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";
import profileholder from "../../images/profileholder.png";

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
        this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          avatarUrl: data.avatar_url,
          loading: false
        });
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    const { firstname, lastname, email, avatarUrl, loading } = this.state;

    return (
      <div>
        <Nav />
        <div>
          <span>{loading ? <Spinner /> : null}</span>
          <h6>Profile</h6>

          <div>
            <img className="rounded-circle" src={avatarUrl} height="180" width="180" alt="Avatar" />
          </div>
          <small className="form-text text-muted">
            <Link to="profileimg">Click to upload Image</Link>
          </small>
          <br />
          <hr />

          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="col">First name:</th>
                <td>{firstname}</td>
              </tr>
              <tr>
                <th scope="col">Last name:</th>
                <td>{lastname}</td>
              </tr>
              <tr>
                <th scope="col">Email:</th>
                <td>{email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Profile;
