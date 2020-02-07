import React, { Component } from "react";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";

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
          <table className="table table-striped">
            <tbody>
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
