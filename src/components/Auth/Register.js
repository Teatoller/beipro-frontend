import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { register } from "../../services/userInstance";
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
      password_confirmation: ""
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
    register(newUser).then(response => {
      if (response) history.push(`/`);
    });
  }

  render() {
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
                  <label html-for="firstname">First Name</label>
                  <input type="text"
                    name="firstname"
                    value={this.firstname}
                    onChange={this.onChange}
                    className="form-control"
                    id="firstname"
                    placeholder="Enter firstname" />
                </div>
                <div className="form-group">
                  <label html-for="firstname">First Name</label>
                  <input type="text"
                    name="lastname"
                    value={this.lastname}
                    onChange={this.onChange}
                    className="form-control"
                    id="firstname"
                    placeholder="Enter lastname" />
                </div>
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
                  <label html-for="passwordConfirm">confirm password</label>
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
                  <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Register</button>
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
