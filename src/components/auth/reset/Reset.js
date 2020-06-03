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
import ResetExtra from "./ResetExtra";
import ResetTextInput from "./ResetTextInput";
import CommonAuthNav from "../common/CommonAuthNav";

class Reset extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
      errors: {
        email: "",
        password: "",
        token: ""
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
    const { email, password, password_confirmation, token } = this.state;
    const { history } = this.props;

    const user = {
      email,
      password,
      password_confirmation,
      token
    };

    this.setState({
      loading: true
    });

    const config = {
      headers: {
        "Content-Type": "application/json, text/plain, */*"
      }
    };

    axios
      .post("/password/reset", user, config)
      .then(response => {
        if (response) {
          this.setState({
            loading: true
          });
          toast.success("Password reset succesful");
          history.push(`/`);
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          errors: {
            email: err.response.request.response,
            password: err.response.request.response,
            token: err.response.request.response
          }
        });
      });
  }

  render() {
    const { email, password, password_confirmation, errors, loading } = this.state;

    return (
      <div>
        <CommonAuthNav />
        <div className="container" aria-label="Password Reset form">
          <div className="row">
            <div className="col-7">
              <span>{loading ? <Spinner /> : null}</span>
              <header className="text-center">
                <p className="text-secondary">Please enter details to reset password</p>
              </header>
              <main>
                <form onSubmit={this.onSubmit}>
                  <ResetTextInput
                    email={email}
                    onChange={this.onChange}
                    password={password}
                    password_confirmation={password_confirmation}
                    loading={loading}
                    errors={errors}
                    handleAlert={this.handleAlert}
                  />
                </form>
              </main>
              <section className="row">
                <ResetExtra />
              </section>
            </div>
            <article className="col-5">
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
Reset.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Reset;
