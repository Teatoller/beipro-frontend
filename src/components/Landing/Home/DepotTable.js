/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";
import { messageError } from "../../auth/common/messageError";

export const DepotTable = props => {
  const {
    selectedLocation,
    curTime,
    selectedLocationItems,
    errors,
    message,
    activePage,
    itemCountPerPage
  } = props;

  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = selectedLocationItems.slice(indexOfFirstItem, indexOfLastItem);

  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };

  return (
    <>
      <main>
        <span className="form-text text-muted">
          {!selectedLocation || selectedLocation === "Select a location" ? (
            ""
          ) : (
            <small>
              {"\u00A0"}
              {selectedLocation}
              {"\u00A0"}
              prices as at {curTime}
            </small>
          )}
        </span>

        <div className="table-responsive">
          <table className="table table-sm table-md table-striped table-hover">
            <thead>
              <tr className="text-secondary text-center">
                <th scope="col">#</th>
                <th scope="col">Logo</th>
                <th scope="col">Company</th>
                <th scope="col">Diesel</th>
                <th scope="col">Petrol</th>
                <th scope="col">Kerosene</th>
                <th scope="col">Ido</th>
                <th scope="col">Fuel Oil</th>
                <th scope="col">Bulk Lpg</th>
              </tr>
            </thead>
            <tbody>
              {selectedLocationItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="form-text text-muted">
                    {!selectedLocation || selectedLocation === "Select a location" ? (
                      ""
                    ) : (
                      <small>
                        No items for
                        {"\u00A0"}
                        {selectedLocation}
                      </small>
                    )}
                  </td>
                </tr>
              ) : (
                currentItems
              )}
            </tbody>
          </table>
          <span style={errors ? dangerStyle : null}>
            <Error error={errors || null} />
          </span>
          {messageError(message)}
        </div>
      </main>
    </>
  );
};
DepotTable.propTypes = {
  curTime: PropTypes.func.isRequired,
  errors: PropTypes.objectOf.isRequired,
  length: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  itemCountPerPage: PropTypes.number.isRequired,
  selectedLocationItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedLocation: PropTypes.string.isRequired,
  slice: PropTypes.func.isRequired
};
export default DepotTable;
