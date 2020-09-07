/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import { ResetView } from "./ResetView";

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
    <>
      <ResetView
        loading={loading}
        onSubmit={onSubmit}
        onChange={onChange}
        inputs={inputs}
        errors={errors}
      />
    </>
  );
};
Reset.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Reset;
