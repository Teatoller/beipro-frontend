/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../axios";
import { setLogin } from "../../redux/actionCreators/authActions";
import Footer from "../Landing/Footer";
// import Error from "../Error";
import Spinner from "../../spinner/Spinner";
import SiteTheme from "./SiteTheme";
import SiteImage from "./SiteImage";
import LoginTextInput from "./LoginTextInput";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      }
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
      .post(`/auth/login`, data)
      .then(res => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("email", res.data.email);
        this.setState({
          loading: true,
        });
        if (res) {
          history.push("/welcome");
        }
      })
      .catch(err => {
        this.setState({
          errors: {
            email: err.response.request.response,
            password: err.response.request.response
          }
        });
        throw err;
      });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div>
        <nav className="header">
          <NavLink to="/" className="logo">
            Beipro
            {/* <br />
            <small
              style={{
                fontSize: ".35em",
                color: "#007bff",
                padding:0,
                margin:0,
              }}
            >
              Petroleum Stock Price&apos;s
            </small> */}
          </NavLink>
          <div className="header-right">
            <NavLink to="/register">Sign up</NavLink>
          </div>
        </nav>
        <div className="container" aria-label="Login form">
          <div>
            <div className="row">
              <div className="col-7 p-2">
                <span>{loading ? <Spinner /> : null}</span>
                <header className="text-center">
                  <p className="text-secondary">Please sign in</p>
                </header>
                <main>
                  <form onSubmit={this.onSubmit}>
                    <LoginTextInput
                      email={email}
                      password={password}
                      onChange={this.onChange}
                      errors={errors}
                      loading={loading}
                    />
                  </form>
                </main>
                <section className="row">
                  <div className="col-6 text-left">
                    <p>
                      Forgot?
                      <NavLink to="/resetrequest"> Password</NavLink>
                    </p>
                  </div>
                  <div className="col-6 text-right">
                    <p>Do not have an account?</p>
                    <span className="create-account">
                      <NavLink to="/register">Sign up</NavLink>
                    </span>
                  </div>
                </section>
              </div>
              <article className="col-5">
                <SiteImage />
                <SiteTheme />
              </article>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape().isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLogin
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);
