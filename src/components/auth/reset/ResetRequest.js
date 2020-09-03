/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
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

const ResetRequest = props => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const { history } = props;

    setLoading(true);

    axios
      .post("/password/create", inputs)
      .then(res => {
        if (res) {
          toast.success("We have e-mailed you a link with password reset token");
          history.push(`/reset`);
        }
      })
      .catch(errors => {
        setErrors(errors.response.request.response);
        setLoading(false);
      });
  };

  return (
    <div>
      <CommonAuthNav />
      <div className="container" aria-label="Password reset request form">
        <div className="row">
          <div className="col-6 m-auto">
            <span>{loading ? <Spinner /> : null}</span>
            <header className="text-center">
              <p className="text-secondary">
                Please enter your Email address below and we&apos;ll send you a link to reset your
                password
              </p>
            </header>
            <main>
              <form onSubmit={onSubmit}>
                <ResetRequestTextInput
                  email={inputs}
                  onChange={onChange}
                  errors={errors}
                  loading={loading}
                />
              </form>
            </main>
            <section className="row">
              <ResetRequestExtra />
            </section>
          </div>
          <article className="col-6">
            <SiteImage />
            <SiteTheme />
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};
ResetRequest.propTypes = {
  history: PropTypes.shape().isRequired
};
export default ResetRequest;
