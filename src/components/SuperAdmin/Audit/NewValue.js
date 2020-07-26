import React from "react";
import PropTypes from "prop-types";

export default function NewValue({ newvalue }) {
  return <div>{newvalue}</div>;
}
NewValue.propTypes = {
  newvalue: PropTypes.shape().isRequired
};