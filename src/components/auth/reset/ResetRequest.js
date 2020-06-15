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
import ResetRequestExtra from "./ResetRequestExtra";
import ResetRequestTextInput from "./ResetRequestTextInput";
import CommonAuthNav from "../common/CommonAuthNav";

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

    this.setState({
      loading: true
    });

    axios
      .post("/password/create", { email })
      .then(res => {
        if (res) {
          toast.success("We have e-mailed you a link with password reset token");
          history.push(`/reset`);
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          errors: {
            email: err.response.request.response
          }
        });
        throw err;
      });
  }

  render() {
    const { email, errors, loading } = this.state;

    return (
      <div>
        <CommonAuthNav />
        <div className="container" aria-label="Password reset request form">
          <div className="row">
            <div className="col-7">
              <span>{loading ? <Spinner /> : null}</span>
              <header className="text-center">
                <p
                  className="text-secondary"
                  style={{
                    fontSize: ".95em",
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
                  <ResetRequestTextInput
                    email={email}
                    onChange={this.onChange}
                    errors={errors}
                    loading={loading}
                  />
                </form>
              </main>
              <section className="row">
                <ResetRequestExtra />
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
ResetRequest.propTypes = {
  history: PropTypes.shape().isRequired
};
export default ResetRequest;
