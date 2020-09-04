import React from "react";
import PropTypes from "prop-types";

export const DepotMenu = props => {
  const { handleChange } = props;
  return (
    <>
      <select className="custom-select custom-select-sm w-50 text-muted" onChange={handleChange}>
        <option selected>Select a location</option>
        <option value="Nairobi">Nairobi</option>
        <option value="Mombasa">Mombasa</option>
        <option value="Kisumu">Kisumu</option>
        <option value="Nakuru">Nakuru</option>
        <option value="Eldoret">Eldoret</option>
      </select>
    </>
  );
};
DepotMenu.propTypes = {
  handleChange: PropTypes.func.isRequired
};
export default DepotMenu;
