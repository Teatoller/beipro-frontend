import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import banner from "../../images/banner.jpg";
import "../css/styles.css";

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      alertMessage: "",
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    // eslint-disable-next-line camelcase
    const { firstname, lastname, email, password, password_confirmation } = this.state;
    const { history } = this.props;

    const newUser = {
      firstname,
      lastname,
      email,
      password,
      password_confirmation
    };

    axios
      .post("/register", newUser, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        const message = response.data;
        this.setState({
          alertMessage: message
        });
        if (response) {
          setTimeout(() => history.push(`/`), 50);
        }
      })
      .catch(err => {
        this.setState({ errors: err.response.request.response });
        const { errors } = this.state;
        console.log("errors..>>>", errors);
        // const data = Object.getOwnPropertyDescriptors(errors);
        // console.log("this...", data);
        // console.log("this...",data.message.value);
        // const descriptor1 = Object.getOwnPropertyDescriptor(data.message.value, "firstname");
        // const descriptor2 = Object.getOwnPropertyDescriptor(data.message.value, "lastname");
        // const descriptor3 = Object.getOwnPropertyDescriptor(data.message.value, "email");
        // const descriptor4 = Object.getOwnPropertyDescriptor(data.message.value, "password");
        // console.log(descriptor1.value[0]);
        // console.log(descriptor2.value[0]);
        // console.log(descriptor3.value[0]);
        // console.log(descriptor4.value[0]);
      });
  }

  render() {
    const { alertMessage, errors } = this.state;

    const alertStyle = {
      fontStyle: "italic",
      color: "green"
    };

    console.log("register errors..!!>>>", errors);

    // const data = Object.getOwnPropertyDescriptors(errors);
    // eslint-disable-next-line dot-notation
    
    console.log("register errors..2>>>", errors[0]);


    return (
      <div>
        <header className="header">
          <NavLink to="/" className="logo">
            Beipro
          </NavLink>
          <div className="header-right">
            <NavLink to="/">Login</NavLink>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-7">

              <span style={alertMessage ? alertStyle : null}>
                {alertMessage ? alertMessage.message : null}
              </span>

              <form>
                <div className="form-group">
                  <label html-for="firstname">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={this.firstname}
                    onChange={this.onChange}
                    className="form-control"
                    id="firstname"
                    placeholder="Enter firstname"
                  />
                </div>
                <div className="form-group">
                  <label html-for="lastname">First Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={this.lastname}
                    onChange={this.onChange}
                    className="form-control"
                    id="lastname"
                    placeholder="Enter lastname"
                  />
                </div>
                <div className="form-group">
                  <label html-for="email">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={this.email}
                    onChange={this.onChange}
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label html-for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={this.password}
                    onChange={this.onChange}
                    className="form-control"
                    id="password"
                  />
                </div>
                <div className="form-group mb-3">
                  <label html-for="passwordConfirm">Confirm password</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={this.password_confirmation}
                    onChange={this.onChange}
                    className="form-control"
                    id="passwordConfirm"
                  />
                </div>
                <div className="text-right mb-3">
                  <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                    Register
                  </button>
                </div>
              </form>
              <div className="row">
                <div className="col text-right">
                  <p>Have an account?</p>
                  <span className="create-account">
                    <NavLink to="/">Login</NavLink>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="m-2">
                <img src={banner} alt="technology" />
              </div>
            </div>
          </div>
        </div>
        <footer className="footer-register">
          <span>Beipro &copy;2018</span>
        </footer>
      </div>
    );
  }
}
Register.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Register;
