/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import banner from "../../images/banner.jpg";
import Footer from "../Landing/Footer";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      alertMessage: "",
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      }
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
      .post("/auth/register", newUser, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        const message = response.data;
        this.setState({
          alertMessage: message,
          loading: true
        });
        if (response) {
          history.push(`/`);
        }
      })
      .catch(err => {
        this.setState({
          errors: {
            firstname: err.response.request.response,
            lastname: err.response.request.response,
            email: err.response.request.response,
            password: err.response.request.response
          }
        });
      });
  }

  render() {
    const { alertMessage, errors, loading } = this.state;

    const alertStyle = {
      fontStyle: "italic",
      color: "green"
    };

    const dangerStyle = {
      fontStyle: "italic",
      color: "red"
    };

    return (
      <div>
        <header className="header">
          <NavLink to="/" className="logo">
            Beipro
          </NavLink>
          <div className="header-right">
            <NavLink to="/">Sign in</NavLink>
          </div>
        </header>
        <div className="container" aria-label="Sign up form">
          <div className="row">
            <div className="col-7">
              <span>{loading ? <Spinner /> : null}</span>
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
                    placeholder="Enter Firstname"
                    aria-describedby="firstnameInput"
                    aria-required="true"
                    aria-invalid="false"
                  />
                </div>
                <div className="form-group">
                  <label html-for="lastname">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={this.lastname}
                    onChange={this.onChange}
                    className="form-control"
                    id="lastname"
                    placeholder="Enter Lastname"
                    aria-describedby="lastnameInput"
                    aria-required="true"
                    aria-invalid="false"
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
                    aria-describedby="emailInput"
                    placeholder="Enter Email"
                    aria-required="true"
                    aria-invalid="false"
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
                    aria-describedby="passwordInput"
                    aria-required="true"
                    aria-invalid="false"
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
                    aria-describedby="confirmPasswordInput"
                    aria-required="true"
                    aria-invalid="false"
                  />
                  <span style={errors.password ? dangerStyle : null}>
                    <Error error={errors.password ? errors.password : null} />
                  </span>
                </div>
                <div className="text-right mb-3">
                  <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                    Sign up
                  </button>
                </div>
              </form>
              <div className="row">
                <div className="col text-right">
                  <p>
                    Have an account?{" "}
                    <span className="create-account">
                      <NavLink to="/">Sign in</NavLink>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="m-2">
                <img
                  className="img-fluid rounded mx-auto d-block img-thumbnail"
                  src={banner}
                  alt="technology"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Register.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Register;
