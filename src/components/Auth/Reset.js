/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import banner from "../../images/banner.jpg";
import "../css/styles.css";

class Reset extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
      message: {},
      errors: {}
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
      .post("/reset", user, config)
      .then(res => {
        console.log("reset alerts!!!", res);
        const message = res.data;
        console.log("reset alert message...", message);
        this.setState({
          message
        });
        if (res) history.push(`/`);
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: err.res.request.response });
        const { errors } = this.state;
        console.log("errors..>>>", errors);
      });
  }

  render() {
    const { message } = this.state;
    console.log("reset msg...", message);
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
              <form>
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
                  <label html-for="passwordConfirmation">confirm password</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={this.password_confirmation}
                    onChange={this.onChange}
                    className="form-control"
                    id="passwordConfirmation"
                  />
                  <div className="form-group">
                    <label html-for="token">Token</label>
                    <input
                      type="string"
                      name="token"
                      value={this.token}
                      onChange={this.onChange}
                      className="form-control"
                      id="token"
                      placeholder="Enter token"
                    />
                    <span>
                      example fs1VuLX8J1DMgyY1uennbJO1vfpzV4mgS3B5m7DgoFGZ5Xcp0FzoaWAtt0NV
                    </span>
                  </div>
                </div>
                <div className="text-right mb-3">
                  <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                    Reset Password
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
Reset.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Reset;
