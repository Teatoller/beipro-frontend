// @flow
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../../axios";
import { setLogin } from "../../../redux/actionCreators/authActions";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import SiteTheme from "../common/SiteTheme";
import SiteImage from "../common/SiteImage";
import LoginTextInput from "./LoginTextInput";
import LoginNav from "./LoginNav";
import LoginExtra from "./LoginExtra";

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

    this.setState({
      loading: true
    });

    axios
      .post(`/auth/login`, data)
      .then(res => {
        if (res) {
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("email", res.data.email);
          history.push("/welcome");
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
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
        <LoginNav />
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
                  <LoginExtra />
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
