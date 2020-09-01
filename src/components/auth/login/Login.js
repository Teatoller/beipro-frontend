// @flow
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
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

const Login = props => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const onSubmit = e => {
    const { history } = props;

    e.preventDefault();

    setLoading(true);

    axios
      .post(`/login`, inputs)
      .then(res => {
        if (res) {
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("email", res.data.email);
          history.push("/welcome");
        }
      })
      .catch((errors) => {
        setErrors(errors.response.request.response);
        setLoading(false);
      });
  };

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <LoginNav />
      <div className="container" aria-label="Login form">
        <div className="row">
          <div className="col-6 p-2">
            <span>{loading ? <Spinner /> : null}</span>
            <header className="text-center">
              <p className="text-secondary">Please Sign in</p>
            </header>
            <main>
              <form onSubmit={onSubmit}>
                <LoginTextInput
                  email={inputs}
                  password={inputs}
                  onChange={onChange}
                  errors={errors}
                  loading={loading}
                />
              </form>
            </main>
            <section className="row">
              <LoginExtra />
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
// }
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
