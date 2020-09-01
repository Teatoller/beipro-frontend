import React from "react";
import PropTypes from "prop-types";

export default function Error({ error }) {
  return <div>{error}</div>;
}
Error.propTypes = {
  error: PropTypes.shape().isRequired
};
