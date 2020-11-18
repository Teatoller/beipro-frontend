/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import { ResetView } from "./ResetView";

const Reset = props => {
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [password_confirmation, setPassword_Confirmation] = useState({});
  const [token, setToken] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const inputs = {
      email,
      password,
      password_confirmation,
      token
    };

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
          history.push("/");
        }
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      <ResetView
        loading={loading}
        onSubmit={onSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        setPassword_Confirmation={setPassword_Confirmation}
        setToken={setToken}
        errors={errors}
        message={message}
      />
    </>
  );
};
Reset.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Reset;
