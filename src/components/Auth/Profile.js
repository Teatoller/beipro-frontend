/* eslint-disable camelcase */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Spinner from "../../spinner/Spinner";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstname: "",
      lastname: "",
      email: "",
      avatar: "",
      avatarUrl: ""
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "content-type": "image/jpeg"
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
          avatar: data.avatar,
          avatarUrl: data.avatar_url,
          loading: false
        });
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    const { firstname, lastname, email, avatar, avatarUrl, loading } = this.state;

    return (
      <div>
        <Nav />
        {/* <Link to="profileimage" >Image Upload</Link> */}
        <Link to="profileimg">Image Upload</Link>
        <div>
          <span>{loading ? <Spinner /> : null}</span>

          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="col">Profile</th>
                <td>
                  <img src={avatarUrl} alt="Avatar" />
                </td>
                <td><img src={avatar} alt="avatar"/></td>
              </tr>
              <tr>
                <th scope="col">First name:</th>
                <td>{firstname}</td>
              </tr>
              <tr>
                <th scope="col">Last name</th>
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
