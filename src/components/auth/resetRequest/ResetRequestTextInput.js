/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { emailError } from "../common/emailError";
import { messageError } from "../common/messageError";

export const ResetRequestTextInput = ({ inputs, onChange, loading, errors, message }) => {
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
          aria-describedby="emailInput"
          placeholder="Enter Email"
        />
        {emailError(errors)}
        {messageError(message)}
      </div>
      <div className="text-right mb-3">
        <button type="submit" className="btn btn-primary btn-sm">
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>
    </>
  );
};
ResetRequestTextInput.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default ResetRequestTextInput;
