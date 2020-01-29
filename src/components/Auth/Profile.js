import React, { Component } from "react";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import "../css/styles.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: ""
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
        const data = res.data;
        this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { firstname, lastname, email } = this.state;
    return (
      <div>
        <Nav />
        <div>
          <div>
            <h6>Profile</h6>
          </div>
          <table>
            <tbody>
              <tr>
                <td>First name:</td>
                <td>{firstname}</td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>{lastname}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Profile;
