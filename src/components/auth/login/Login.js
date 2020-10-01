/* eslint-disable no-shadow */
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
import LoginView from "./LoginView";

export const Login = props => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

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
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <LoginView
        loading={loading}
        onSubmit={onSubmit}
        inputs={inputs}
        onChange={onChange}
        errors={errors}
        message={message}
      />
    </>
  );
};
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
