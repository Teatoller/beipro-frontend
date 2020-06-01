/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import beiprostorage from "../../images/beiprostorage.svg";
import Footer from "../Landing/Footer";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";
import SiteTheme from "./SiteTheme";

class Reset extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
      errors: {
        email: "",
        password: "",
        token: ""
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
    const { email, password, password_confirmation, token } = this.state;
    const { history } = this.props;

    const user = {
      email,
      password,
      password_confirmation,
      token
    };

    const config = {
      headers: {
        "Content-Type": "application/json, text/plain, */*"
      }
    };

    axios
      .post("/password/reset", user, config)
      .then(response => {
        this.setState({
          loading: true
        });
        if (response) {
          toast.success("Password reset succesful");
          history.push(`/`);
        }
      })
      .catch(err => {
        this.setState({
          errors: {
            email: err.response.request.response,
            password: err.response.request.response,
            token: err.response.request.response
          }
        });
      });
  }

  render() {
    const { errors, loading } = this.state;

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
        <div className="container" aria-label="Password Reset form">
          <div className="row">
            <div className="col-7">
              <span>{loading ? <Spinner /> : null}</span>
              <header className="text-center">
                <p className="text-secondary">Please enter details to reset password</p>
              </header>
              <main>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={this.email}
                      onChange={this.onChange}
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      aria-describedby="emailInput"
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
                    <label htmlFor="passwordConfirmation">confirm password</label>
                    <input
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                      value={this.password_confirmation}
                      onChange={this.onChange}
                      className="form-control"
                      id="passwordConfirmation"
                      aria-describedby="passwordConfirmationInput"
                      aria-required="true"
                      aria-invalid="false"
                    />
                    <div className="form-group">
                      <label htmlFor="token">Token</label>
                      <input
                        type="string"
                        name="token"
                        value={this.token}
                        onChange={this.onChange}
                        className="form-control"
                        id="token"
                        placeholder="Enter Token"
                        aria-describedby="tokenInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                      <span style={errors.password ? dangerStyle : null}>
                        <Error error={errors.password ? errors.password : null} />
                      </span>
                      <span>
                        example:{" "}
                        <code>fs1VuLX8J1DMgyY1uennbJO1vfpzV4mgS3B5m7DgoFGZ5Xcp0FzoaWAtt0NV</code>
                      </span>
                    </div>
                  </div>
                  <div className="text-right mb-3">
                    <input
                      type="submit"
                      className="btn btn-primary btn-sm"
                      value="Reset Password"
                    />
                  </div>
                </form>
              </main>
              <section className="row">
                <div className="col text-right">
                  <p>
                    Have an account?{" "}
                    <span className="create-account">
                      <NavLink to="/">Sign in</NavLink>
                    </span>
                  </p>
                </div>
              </section>
            </div>
            <article className="col-5">
              <div className="m-2">
                <img
                  className="img-fluid rounded mx-auto d-block img-thumbnail"
                  src={beiprostorage}
                  alt="Petroleum storage tanks installation. Sets the theme for the web site"
                />
              </div>
              <SiteTheme />
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Reset.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Reset;
