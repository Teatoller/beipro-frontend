import React from "react";
import PropTypes from "prop-types";

const Location = props => {
  const { onChange } = props;
  return (
    <select
      className="form-control form-control-sm"
      name="location_code"
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
Location.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default Location;
