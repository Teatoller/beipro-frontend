/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import SiteTheme from "../common/SiteTheme";
import SiteImage from "../common/SiteImage";
import RegisterTextInput from "./RegisterTextInput";
import RegisterExtra from "./RegisterExtra";
import CommonAuthNav from "../common/CommonAuthNav";

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      alertMessage: "",
      checkbox: false,
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    // eslint-disable-next-line camelcase
    const { firstname, lastname, email, password, password_confirmation } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true
    });

    const newUser = {
      firstname,
      lastname,
      email,
      password,
      password_confirmation
    };

    axios
      .post("/auth/register", newUser, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        const message = response.data;

        if (response) {
          this.setState({
            alertMessage: message
          });
          toast.success(
            "Success, check for an email with confirmation link to complete the activation process."
          );
          history.push(`/`);
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          errors: {
            firstname: err.response.request.response,
            lastname: err.response.request.response,
            email: err.response.request.response,
            password: err.response.request.response
          }
        });
      });
  }

  handleAlert = e => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert(
      "Please indicate that you have read and agree to the Terms, Conditions and Privacy Policy"
    );
  };

  render() {
    const {
      loading,
      firstname,
      lastname,
      email,
      password,
      password_confirmation,
      alertMessage,
      checkbox,
      errors
    } = this.state;

    const alertStyle = {
      fontStyle: "italic",
      color: "green"
    };

    return (
      <div>
        <CommonAuthNav />
        <div className="container" aria-label="Sign-up form">
          <div className="row">
            <div className="col-7">
              <span>{loading ? <Spinner /> : null}</span>
              <header className="text-center">
                <p className="text-secondary">Please Sign up</p>
              </header>
              <span style={alertMessage ? alertStyle : null}>
                {alertMessage ? alertMessage.message : null}
              </span>
              <main>
                <form onSubmit={this.onSubmit}>
                  <RegisterTextInput
                    firstname={firstname}
                    lastname={lastname}
                    email={email}
                    onChange={this.onChange}
                    password={password}
                    password_confirmation={password_confirmation}
                    loading={loading}
                    errors={errors}
                    checkbox={checkbox}
                    handleAlert={this.handleAlert}
                  />
                </form>
              </main>
              <section className="row">
                <RegisterExtra />
              </section>
            </div>
            <article className="col-5 loginimg">
              <SiteImage />
              <SiteTheme />
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Register.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Register;
