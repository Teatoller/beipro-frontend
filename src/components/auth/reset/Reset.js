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
import ResetExtra from "./ResetExtra";
import ResetTextInput from "./ResetTextInput";
import CommonAuthNav from "../common/CommonAuthNav";

const Reset = props => {
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

    const config = {
      headers: {
        "Content-Type": "application/json, text/plain, */*"
      }
    };

    axios
      .post("/password/reset", inputs, config)
      .then(response => {
        if (response) {
          setLoading(true);
          toast.success("Password reset succesful");
          history.push(`/`);
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
      <div className="container" aria-label="Password Reset form">
        <div className="row">
          <div className="col-6 m-auto">
            <span>{loading ? <Spinner /> : null}</span>
            <header className="text-center">
              <p className="text-secondary">Please enter details to reset password</p>
            </header>
            <main>
              <form onSubmit={onSubmit}>
                <ResetTextInput
                  email={inputs}
                  onChange={onChange}
                  password={inputs}
                  password_confirmation={inputs}
                  loading={loading}
                  errors={errors}
                  handleAlert={onChange}
                />
              </form>
            </main>
            <section className="row mt-1">
              <ResetExtra />
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
Reset.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Reset;
