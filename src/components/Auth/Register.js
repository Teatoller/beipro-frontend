/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { NavLink, Link } from "react-router-dom";
import axios from "../../axios";
import Footer from "../Landing/Footer";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";
import SiteTheme from "./SiteTheme";
import SiteImage from "./SiteImage";

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
      checkbox: false,
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
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
          toast.success(
            "Success, check for an email with confirmation link to complete the activation process."
          );
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

  handleAlert = e => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert(
      "Please indicate that you have read and agree to the Terms, Conditions and Privacy Policy"
    );
  };

  render() {
    const { alertMessage, errors, checkbox, loading } = this.state;

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
        <nav className="header">
          <NavLink to="/" className="logo">
            Beipro
          </NavLink>
          <div className="header-right">
            <NavLink to="/">Sign in</NavLink>
          </div>
        </nav>
        <div className="container" aria-label="Sign up form">
          <div className="row">
            <div className="col-7">
              <span>{loading ? <Spinner /> : null}</span>
              <header className="text-center">
                <p className="text-secondary">Please sign up</p>
              </header>
              <span style={alertMessage ? alertStyle : null}>
                {alertMessage ? alertMessage.message : null}
              </span>
              <main>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
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
                    <label htmlFor="lastname">Last Name</label>
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
                    <label htmlFor="email">Email address</label>
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
                    <label htmlFor="password">Password</label>
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
                    <label htmlFor="passwordConfirm">Confirm password</label>
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
                  <span>Please indicate:</span>

                  <div className="text-right mb-3">
                    <span style={{ color: "red" }}>&#42;</span>
                    <input
                      type="checkbox"
                      name="checkbox"
                      value={this.checkbox}
                      id="agree"
                      onChange={this.onChange}
                    />{" "}
                    <span className="size-petit">
                      I have read and agree to the
                      <Link to="terms"> Terms & Conditions</Link> and{" "}
                      <Link to="privacy-policy">Privacy Policy.</Link>{" "}
                    </span>
                    {checkbox === false ? (
                      <button
                        type="submit"
                        className="btn btn-secondary btn-sm"
                        onClick={this.handleAlert}
                      >
                        Sign up
                      </button>
                    ) : (
                      <input type="submit" className="btn btn-primary btn-sm" value="Sign up" />
                    )}
                  </div>
                </form>
              </main>
              <section className="row">
                <div className="col text-right">
                  <p>
                    Already have an account?{" "}
                    <span className="create-account">
                      <NavLink to="/">Sign in</NavLink>
                    </span>
                  </p>
                </div>
              </section>
            </div>
            <article className="col-5">
              <SiteImage />
              <SiteTheme />
            </article>
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
