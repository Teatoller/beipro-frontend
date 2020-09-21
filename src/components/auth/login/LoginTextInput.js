/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";

export const LoginTextInput = ({ inputs, onChange, loading, errors }) => {
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
          className="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Enter Email"
          aria-required="true"
        />
      </div>
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
          className="form-control"
          id="password"
          aria-describedby="password"
          aria-required="true"
        />
        <span className={`text-danger ${errors ? "is-invalid" : ""}`}>
          <Error error={errors || null} />
        </span>
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
  errors: PropTypes.bool.isRequired
};
export default LoginTextInput;
