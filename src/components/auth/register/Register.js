/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import { RegisterView } from "./RegisterView";

export const Register = props => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setCheckbox({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const { history } = props;

    setLoading(true);

    axios
      .post("/register", inputs, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        if (response) {
          toast.success(
            "Success, check for an email with confirmation link to complete the activation process."
          );
          history.push(`/`);
        }
      })
      .catch(errors => {
        setErrors(errors.response.request.response);
        setLoading(false);
      });
  };

  const handleAlert = e => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert(
      "Please indicate that you have read and agree to the Terms, Conditions and Privacy Policy"
    );
  };

  return (
    <>
      <RegisterView
        firstname={inputs}
        lastname={inputs}
        email={inputs}
        onChange={onChange}
        onSubmit={onSubmit}
        password={inputs}
        password_confirmation={inputs}
        loading={loading}
        errors={errors}
        checkbox={checkbox}
        handleAlert={handleAlert}
      />
    </>
  );
};
Register.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Register;
