/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";

const ResetTextInput = ({
  email,
  password,
  password_confirmation,
  token,
  onChange,
  loading,
  errors
}) => {
  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
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
          value={email}
          onChange={onChange}
          className="form-control"
          id="email"
          placeholder="Enter Email"
          aria-describedby="emailInput"
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
      <div className="form-group mb-0">
        <label className="form-label" htmlFor="passwordConfirmation">
          confirm password
        </label>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={password_confirmation}
          onChange={onChange}
          className="form-control"
          id="passwordConfirmation"
          aria-describedby="passwordConfirmationInput"
          aria-required="true"
          aria-invalid="false"
        />
        <div className="form-group m-0">
          <label className="form-label" htmlFor="token">
            Token
          </label>
          <input
            type="string"
            name="token"
            value={token}
            onChange={onChange}
            className="form-control"
            id="token"
            placeholder="Enter Token"
            aria-describedby="tokenInput"
            aria-required="true"
            aria-invalid="false"
          />
          <span style={errors.password ? dangerStyle : null}>
            <Error error={errors.password ? errors.password : null} />
          </span>
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
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  password_confirmation: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired
};
export default ResetTextInput;
