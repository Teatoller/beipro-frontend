import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";

const ResetRequestTextInput = ({ email, onChange, loading, errors }) => {
  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };

  return (
    <>
      <div className="form-group form-height">
        <label className="form-label" htmlFor="email">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          className="form-control input-font"
          id="email"
          aria-describedby="emailInput"
          placeholder="Enter Email"
        />
        <span style={errors.email ? dangerStyle : null}>
          <Error error={errors.email ? errors.email : null} />
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
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired
};
export default ResetRequestTextInput;
