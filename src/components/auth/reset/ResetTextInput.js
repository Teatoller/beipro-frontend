/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { emailError } from "../common/emailError";
import { passwordError } from "../common/passwordError";
import { tokenError } from "../common/tokenError";
import { messageError } from "../common/messageError";
import { Eye } from "../../statics/Eye";
import { EyeSlash } from "../../statics/EyeSlash";

export const ResetTextInput = ({
  loading,
  errors,
  message,
  setEmail,
  setPassword,
  setPassword_Confirmation,
  setToken
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <div className="form-group m-0">
        <label className="form-label" htmlFor="email">
          Email address
        </label>
        <input
          type="email"
          name="email"
          onChange={e => {
            setEmail(e.target.value.toLowerCase());
          }}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="email"
          placeholder="Enter Email"
          aria-describedby="emailInput"
          aria-required="true"
          aria-invalid="false"
        />
        {emailError(errors)}
      </div>
      <div className="form-group m-0 relative">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type={passwordShown ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          onChange={e => {
            setPassword(e.target.value);
          }}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="password"
          aria-describedby="passwordInput"
          aria-required="true"
          aria-invalid="false"
        />
        <span
          className="position-absolute"
          style={{
            top: "54%",
            right: "5%"
          }}
          onClick={togglePasswordVisiblity}
        >
          {passwordShown ? <Eye /> : <EyeSlash />}
        </span>
        {passwordError(errors)}
      </div>
      <div className="form-group mb-0 relative">
        <label className="form-label" htmlFor="passwordConfirmation">
          confirm password
        </label>
        <input
          type={passwordShown ? "text" : "password"}
          name="password_confirmation"
          placeholder="Confirm Password"
          onChange={e => {
            setPassword_Confirmation(e.target.value);
          }}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="passwordConfirmation"
          aria-describedby="passwordConfirmationInput"
          aria-required="true"
          aria-invalid="false"
        />
        {passwordError(errors)}
        <div className="form-group m-0">
          <label className="form-label" htmlFor="token">
            Token
          </label>
          <input
            type="string"
            name="token"
            onChange={e => {
              setToken(e.target.value);
            }}
            className={`form-control ${errors.token ? "is-invalid" : ""}`}
            id="token"
            placeholder="Enter Token"
            aria-describedby="tokenInput"
            aria-required="true"
            aria-invalid="false"
          />
          {tokenError(errors)}
          {messageError(message)}
          <span>
            example: <code>fs1VuLX8J1DMgyY1uennbJO1vfpzV4mgS3B5m7DgoFGZ5Xcp0FzoaWAtt0NV</code>
          </span>
        </div>
      </div>
      <div className="text-right mb-0">
        <button type="submit" className="btn btn-primary btn-sm mt-1">
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </div>
    </>
  );
};
ResetTextInput.propTypes = {
  loading: PropTypes.bool.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setPassword_Confirmation: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default ResetTextInput;
