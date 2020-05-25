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

class ResetRequest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      errors: {
        email: ""
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
    const { email } = this.state;
    const { history } = this.props;

    axios
      .post("/password/create", { email })
      .then(res => {
        this.setState({
          loading: true
        });
        if (res) {
          toast.success("We have e-mailed you a link with password reset token");
          history.push(`/reset`);
        }
      })
      .catch(err => {
        this.setState({
          errors: {
            email: err.response.request.response
          }
        });
        throw err;
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
        <div className="container" aria-label="Password reset request form">
          <div className="row">
            <div className="col-7">
              <span>{loading ? <Spinner /> : null}</span>
              <header className="text-center">
                <p
                  className="text-secondary"
                  style={{
                    fontSize: ".85em",
                    color: "gray",
                    padding: "8px"
                  }}
                >
                  Please enter your Email address below and we&apos;ll send you a link to reset your
                  password
                </p>
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
                      aria-describedby="emailInput"
                      placeholder="Enter Email"
                    />
                    <span style={errors.email ? dangerStyle : null}>
                      <Error error={errors.email ? errors.email : null} />
                    </span>
                  </div>
                  <div className="text-right mb-3">
                    <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
                  </div>
                </form>
              </main>
              <section className="row">
                <div className="col text-right">
                  <p>Have an account?</p>
                  <span className="create-account">
                    <NavLink to="/">Sign in</NavLink>
                  </span>
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
              <div className="container">
                <p
                  style={{
                    fontSize: ".95em",
                    fontStyle: "italic",
                    color: "gray",
                    padding: "8px"
                  }}
                >
                  <span style={{ textDecoration: "italic", fontWeight: "bold" }}>Beipro </span>is a{" "}
                  <span>dynamic platform </span>that
                  <span>
                    {" "}
                    remotely{" "}
                    <span style={{ textDecoration: "italic", fontWeight: "bold" }}>
                      {" "}
                      connects buyers
                    </span>{" "}
                  </span>
                  <span style={{ textDecoration: "italic", fontWeight: "bold" }}>to</span>
                  <span>
                    {" "}
                    the prevailing{" "}
                    <span style={{ textDecoration: "italic", fontWeight: "bold" }}>
                      {" "}
                      sellers
                    </span>{" "}
                    bulk petroleum stock prices
                  </span>
                </p>
              </div>
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
ResetRequest.propTypes = {
  history: PropTypes.shape().isRequired
};
export default ResetRequest;
