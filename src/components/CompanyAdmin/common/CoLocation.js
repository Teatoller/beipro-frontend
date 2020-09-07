import React from "react";
import PropTypes from "prop-types";

export const CoLocation = props => {
  const { onChange } = props;
  return (
    <select
      className="form-control form-control-sm"
      name="location"
      onChange={onChange}
      id="location"
      aria-describedby="locationInput"
      aria-required="true"
      aria-invalid="false"
    >
      <option value=" ">Select location</option>
      <option value="Nairobi">Nairobi</option>
      <option value="Mombasa">Mombasa</option>
      <option value="Kisumu">Kisumu</option>
      <option value="Nakuru">Nakuru</option>
      <option value="Eldoret">Eldoret</option>
    </select>
  );
};
CoLocation.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default CoLocation;
