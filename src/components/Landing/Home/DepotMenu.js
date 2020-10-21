import React from "react";
import PropTypes from "prop-types";

export const DepotMenu = props => {
  const { handleChange, searchSpace } = props;
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
      <div className="d-inline p-2 bg-light text-white">
        <input
          className="border border-info rounded w-25 text-muted text-center"
          type="text"
          placeholder="Search"
          onChange={e => searchSpace(e)}
        />
      </div>
    </>
  );
};
DepotMenu.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchSpace: PropTypes.func.isRequired
};
export default DepotMenu;
