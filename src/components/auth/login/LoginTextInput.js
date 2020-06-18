import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";

const LoginTextInput = ({ email, onChange, password, loading, errors }) => {
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
          value={email}
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
          value={password}
          onChange={onChange}
          className="form-control"
          id="password"
          aria-describedby="password"
          aria-required="true"
        />
        <span style={errors.password ? dangerStyle : null}>
          <Error error={errors.password ? errors.password : null} />
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
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired
};
export default LoginTextInput;
