/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Error from "../../Error";

function RegisterTextInput({
  firstname,
  lastname,
  email,
  password,
  password_confirmation,
  onChange,
  checkbox,
  handleAlert,
  loading,
  errors
}) {
  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
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
          value={firstname}
          onChange={onChange}
          className="form-control"
          id="firstname"
          placeholder="Enter Firstname"
          aria-describedby="firstnameInput"
          aria-required="true"
          aria-invalid="false"
        />
      </div>
      <div className="form-group m-0">
        <label className="form-label" htmlFor="lastname">
          Last Name
        </label>
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={onChange}
          className="form-control"
          id="lastname"
          placeholder="Enter Lastname"
          aria-describedby="lastnameInput"
          aria-required="true"
          aria-invalid="false"
        />
      </div>
      <div className="form-group m-0">
        <label className="form-label" htmlFor="email">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          className="form-control"
          id="email"
          aria-describedby="emailInput"
          placeholder="Enter Email"
          aria-required="true"
          aria-invalid="false"
        />
      </div>
      <div className="form-group m-0">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={onChange}
          className="form-control"
          id="password"
          aria-describedby="passwordInput"
          aria-required="true"
          aria-invalid="false"
        />
      </div>
      <div className="form-group m-0">
        <label className="form-label" htmlFor="passwordConfirm">
          Confirm password
        </label>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={password_confirmation}
          onChange={onChange}
          className="form-control"
          id="passwordConfirm"
          aria-describedby="confirmPasswordInput"
          aria-required="true"
          aria-invalid="false"
        />
        <span style={errors.password ? dangerStyle : null}>
          <Error error={errors.password ? errors.password : null} />
        </span>
      </div>
      <span>Please indicate:</span>

      <div className="text-right">
        <span className="text-danger">&#42;</span>
        <input
          type="checkbox"
          name="checkbox"
          value={checkbox}
          id="agree"
          onChange={onChange}
        />{" "}
        <span className="">
          <small>
            I have read and agree to the
            <Link to="terms"> Terms & Conditions</Link> and{" "}
            <Link to="privacy-policy">Privacy Policy.</Link>{" "}
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
}
RegisterTextInput.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  password_confirmation: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleAlert: PropTypes.func.isRequired,
  checkbox: PropTypes.bool.isRequired,
  errors: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired
};
export default RegisterTextInput;
