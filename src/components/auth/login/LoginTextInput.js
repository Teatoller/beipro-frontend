/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { passwordError } from "../common/passwordError";
import { emailError } from "../common/emailError";
import { messageError } from "../common/messageError";

export const LoginTextInput = ({ inputs, onChange, loading, errors, message }) => {
  return (
    <>
      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={inputs}
          onChange={onChange}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="email"
          aria-describedby="email"
          placeholder="Enter Email"
          aria-required="true"
        />
      </div>
      {emailError(errors)}
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={inputs}
          onChange={onChange}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="password"
          aria-describedby="password"
          aria-required="true"
        />
        {passwordError(errors)}
        {messageError(message)}
      </div>
      <div className="text-right mb-3">
        <button type="submit" className="btn btn-primary btn-sm">
          {loading ? "Processing..." : "Sign-in"}
        </button>
      </div>
    </>
  );
};
LoginTextInput.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default LoginTextInput;
