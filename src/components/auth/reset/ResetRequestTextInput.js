/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";

const ResetRequestTextInput = ({ inputs, onChange, loading, errors }) => {
  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };

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
          aria-describedby="emailInput"
          placeholder="Enter Email"
        />
        <span style={errors ? dangerStyle : null}>
          <Error error={errors || null} />
        </span>
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
  inputs: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf.isRequired,
  loading: PropTypes.bool.isRequired
};
export default ResetRequestTextInput;
