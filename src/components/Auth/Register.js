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
      history.push(`/`);
    });
  }

  render() {
    return (
      <div>
        <header className="header">
          <NavLink to="/landing" className="logo">
            Beipro
          </NavLink>
          <div className="header-right">
            <NavLink to="/">Login</NavLink>
          </div>
        </header>
        <main>
          <div id="main-div" className="ring">
            <form noValidate onSubmit={this.onSubmit} id="left">
              <div>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Enter firstname"
                  value={this.firstname}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Enter lastname"
                  value={this.lastname}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={this.email}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.password}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={this.password_confirmation}
                  onChange={this.onChange}
                />
              </div>
              <div className="login-btn">
                <button className="btn-welcome" type="submit">
                  Register
                </button>
              </div>

              <div>
                <p>Already have an account?</p>
                <span>
                  <NavLink to="/">SignIn</NavLink>
                </span>
              </div>
            </form>
            <img id="right" src={banner} alt="technology" />
          </div>
        </main>

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
