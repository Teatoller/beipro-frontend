/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import banner from "../../images/banner.jpg";
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
      .post("/create", { email })
      .then(res => {
        this.setState({
          loading: true
        });
        if (res) history.push(`/reset`);
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
        <header className="header">
          <NavLink to="/" className="logo">
            Beipro
          </NavLink>
          <div className="header-right">
            <NavLink to="/">Login</NavLink>
          </div>
        </header>
        <div className="container" aria-label="Password reset request form">
          <div className="row">
            <div className="col-7">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="text-center">
                <p className="text-secondary">
                  Please enter your Email address below and we&apos;ll send you a link to reset your
                  password
                </p>
              </div>
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
                    aria-describedby="emailInput"
                    placeholder="Enter email"
                  />
                  <span style={errors.email ? dangerStyle : null}>
                    <Error error={errors.email ? errors.email : null} />
                  </span>
                </div>
                <div className="text-right mb-3">
                  <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                    Submit
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
                <img
                  className="img-fluid rounded mx-auto d-block img-thumbnail"
                  src={banner}
                  alt="technology"
                />
              </div>
            </div>
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
