import React, { Component } from "react";
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
      avatar: '',
      avatarUrl: ''
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios
      .post(`/profile`, {}, config)
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
    const { firstname, lastname, email, loading, avatar, avatarUrl } = this.state;

    return (
      <div>
        <Nav />
        <div>
          <span>{loading ? <Spinner /> : null}</span>
          <div>
            <h6>Profile</h6>
          </div>
          <table className="table table-striped">
            <tbody>
            <tr>
                <th scope="col">Avatar:</th>
                <td><img src={avatar} alt="avatar" /></td>
                <td><img src={avatarUrl} alt="avatarUrl" /></td>
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
