/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Link } from "react-router-dom";
import { firstnameError } from "../common/firstnameError";
import { lastnameError } from "../common/lastnameError";
import { emailError } from "../common/emailError";
import { passwordError } from "../common/passwordError";
import { messageError } from "../common/messageError";
import { Eye } from "../../statics/Eye";
import { EyeSlash } from "../../statics/EyeSlash";

export const RegisterTextInput = ({
  inputs,
  onChange,
  checkbox,
  handleAlert,
  loading,
  errors,
  message,
  setCheckbox
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const toggle_checkbox = () => {
    setCheckbox(!checkbox);
  };
  return (
    <>
      <div className="form-group m-0">
        <label className="form-label" htmlFor="firstname">
          First Name
        </label>
        <input
          type="text"
          name="firstname"
          value={inputs}
          onChange={onChange}
          className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
          id="firstname"
          placeholder="Enter Firstname"
          aria-describedby="firstnameInput"
          aria-required="true"
          aria-invalid="false"
        />
        {firstnameError(errors)}
      </div>
      <div className="form-group m-0">
        <label className="form-label" htmlFor="lastname">
          Last Name
        </label>
        <input
          type="text"
          name="lastname"
          value={inputs}
          onChange={onChange}
          className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
          id="lastname"
          placeholder="Enter Lastname"
          aria-describedby="lastnameInput"
          aria-required="true"
          aria-invalid="false"
        />
        {lastnameError(errors)}
      </div>
      <div className="form-group m-0">
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
          aria-describedby="emailInput"
          placeholder="Enter Email"
          aria-required="true"
          aria-invalid="false"
        />
        {emailError(errors)}
      </div>
      <div className="form-group m-0 position-relative">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type={passwordShown ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          value={inputs}
          onChange={onChange}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="password"
          aria-describedby="passwordInput"
          aria-required="true"
          aria-invalid="false"
        />
        <span
          className="position-absolute"
          style={{
            // position: "absolute",
            top: "54%",
            right: "5%"
          }}
          onClick={togglePasswordVisiblity}
        >
          {passwordShown ? <Eye /> : <EyeSlash />}
        </span>
        {passwordError(errors)}
      </div>
      <div className="form-group m-0 position-relative">
        <label className="form-label" htmlFor="passwordConfirm">
          Confirm password
        </label>
        <input
          type={passwordShown ? "text" : "password"}
          name="password_confirmation"
          placeholder="Confirm Password"
          value={inputs}
          onChange={onChange}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="passwordConfirm"
          aria-describedby="confirmPasswordInput"
          aria-required="true"
          aria-invalid="false"
        />
        {passwordError(errors)}
        {messageError(message)}
      </div>
      <span>Please indicate:</span>

      <div className="text-right">
        <span className="text-danger">&#42;</span>
        <input type="checkbox" name="checkbox" id="agree" onChange={toggle_checkbox} />{" "}
        <span className="">
          <small>
            I have read and agree to the
            <BrowserRouter>
              <Link to="terms"> Terms & Conditions</Link> and{" "}
              <Link to="privacy-policy">Privacy Policy.</Link>{" "}
            </BrowserRouter>
          </small>
        </span>
        {checkbox === false ? (
          <button type="submit" className="btn btn-secondary btn-sm" onClick={handleAlert}>
            {loading ? "Processing..." : "Sign-up"}
          </button>
        ) : (
          <button type="submit" className="btn btn-primary btn-sm">
            {loading ? "Processing..." : "Sign-up"}
          </button>
        )}
      </div>
    </>
  );
};
RegisterTextInput.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleAlert: PropTypes.func.isRequired,
  checkbox: PropTypes.bool.isRequired,
  setCheckbox: PropTypes.func.isRequired
};
export default RegisterTextInput;
