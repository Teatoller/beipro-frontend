import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";
import axios from "../../axios";
import * as AuthActionCreators from "../../redux/actionCreators/authActions";
import Error from "../Error";
import banner from "../../images/banner.jpg";
import "../css/styles.css";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    const { email, password } = this.state;
    const { history, setLogin } = this.props;
    e.preventDefault();
    const data = { email, password };

    axios
      .post(`/login`, data)
      .then(res => {
        cookie.set("token", res.data.access_token);
        setLogin(res.data.user);
        history.push("/welcome");
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const { dispatch , user} = this.props;

    const setLogin = bindActionCreators(AuthActionCreators.setLogin, dispatch);

    return (
      <div>
        <header className="header">
          <NavLink to="/landing" className="logo">
            Beipro
          </NavLink>
          <div className="header-right">
            <NavLink to="/register">Register</NavLink>
          </div>
        </header>
        <main>
          <div id="main-div" className="ring">
            <form noValidate onSubmit={this.onSubmit} id="left">
              <div>
                <span className="form-logo">Beipro</span>
              </div>
              <h3>Please log in</h3>
              {/* <Error
                error={
                  errors.result ? errors.result : null
                }
              /> */}
              <div>
                {/* <Error error={errors.email ? errors.email : null} /> */}
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={this.email}
                  onChange={this.onChange}
                />
              </div>
              <div>
                {/* <Error error={errors.password ? errors.password : null} /> */}
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="login-btn">
                <button className="btn-welcome" type="submit">
                  Login
                </button>
              </div>
              <div>
                <p>
                  Forgot
                  <NavLink to="/reset"> Password</NavLink>
                </p>
              </div>
              <div>
                <p>Do not have an account?</p>
                <span className="create-account">
                  <NavLink to="/register">Create Account</NavLink>
                </span>
              </div>
            </form>
            <img id="right" src={banner} alt="technology" />
          </div>
        </main>

        <footer className="footer-login">
          <span>Beipro &copy;2018</span>
        </footer>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape().isRequired,
  setLogin: PropTypes.shape().isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
  };
};

export default connect(null, mapDispatchToProps)(Login);
