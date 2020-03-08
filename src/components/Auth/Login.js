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
import banner from "../../images/banner.jpg";
import Footer from "../Landing/Footer";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";

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
          loading: true
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
    const { errors, loading } = this.state;

    const dangerStyle = {
      _fontStyle: "italic",
      get fontStyle() {
        return this._fontStyle;
      },
      set fontStyle(value) {
        this._fontStyle = value;
      },
      color: "red"
    };

    return (
      <div>
        <nav className="header">
          <NavLink to="/" className="logo">
            Beipro
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
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        name="email"
                        value={this.email}
                        onChange={this.onChange}
                        className="form-control"
                        id="email"
                        aria-describedby="email"
                        placeholder="Enter Email"
                        aria-required="true"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={this.password}
                        onChange={this.onChange}
                        className="form-control"
                        id="password"
                        aria-describedby="password"
                        aria-required="true"
                      />
                      <span style={errors.password ? dangerStyle : null}>
                        <Error error={errors.password ? errors.password : null} />
                      </span>
                    </div>
                    <div className="text-right mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                        onClick={this.onSubmit}
                      >
                        Sign in
                      </button>
                    </div>
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
                <div className="m-2">
                  <img
                    className="img-fluid rounded mx-auto d-block img-thumbnail"
                    src={banner}
                    alt="Petroleum storage tanks installation. Sets the theme for the web site"
                  />
                </div>
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
