import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";
import axios from "../../axios";
import { setLogin } from "../../redux/actionCreators/authActions";
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
    const { history } = this.props;
    e.preventDefault();
    const data = { email, password };

    axios
      .post(`/login`, data)
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem("email", res.data.user.email);
        cookie.set("token", res.data.access_token);
        history.push("/welcome");
      })
      .catch(err => this.setState({ errors: err.response.res.data.errors }));
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <header className="header">
          <NavLink to="/" className="logo">
            Beipro
          </NavLink>
          <div className="header-right">
            <NavLink to="/register">Register</NavLink>
          </div>
        </header>
        <div className="container">
          <div>
            <div className="row">
              <div className="col-7 p-2">
                <div className="text-center">
                  <p className="text-secondary">Please log in</p>
                </div>
                <form>
                  <div className="form-group">
                    <label html-for="email">Email address</label>
                    <input type="email"
                      name="email"
                      value={this.email}
                      onChange={this.onChange}
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email" />
                  </div>
                  <div className="form-group mb-3">
                    <label html-for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={this.password}
                      onChange={this.onChange}
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="text-right mb-3">
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Login</button>
                  </div>
                </form>
                <div className="row">
                  <div className="col-6 text-left">
                    <p>
                      Forgot
                  <NavLink to="/reset"> Password</NavLink> ?
                    </p>
                  </div>
                  <div className="col-6 text-right">
                    <p>Do not have an account?</p>
                    <span className="create-account">
                      <NavLink to="/register">Register</NavLink>
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
        </div>
        <footer className="footer-login">
          <span>Beipro &copy;2018</span>
        </footer>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLogin
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);
