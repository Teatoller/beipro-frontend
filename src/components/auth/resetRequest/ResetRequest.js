/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import { ResetRequestView } from "./ResetRequestView";

const ResetRequest = props => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

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
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      <ResetRequestView
        loading={loading}
        onChange={onChange}
        onSubmit={onSubmit}
        inputs={inputs}
        errors={errors}
        message={message}
      />
    </>
  );
};
ResetRequest.propTypes = {
  history: PropTypes.shape().isRequired
};
export default ResetRequest;
