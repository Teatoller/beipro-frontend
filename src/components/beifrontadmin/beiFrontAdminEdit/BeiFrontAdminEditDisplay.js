/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

export const BeiFrontAdminEditDisplay = props => {
  const { currentPrice } = props;
  return (
    <>
      <div className="col-sm-6 mx-auto">
        <h5 className="text-secondary">Current Price</h5>
        <div className="table-responsive m-0">
          <table className="table table-sm table-md table-striped table-hover table-bordered text-secondary">
            <thead>
              <tr>
                <th>#</th>
                <th>Front-office-id</th>
                <th scope="col">Diesel</th>
                <th scope="col">Petrol</th>
                <th scope="col">Kerosene</th>
                <th scope="col">Ido</th>
                <th scope="col">Fuel Oil</th>
                <th scope="col">Lpg</th>
              </tr>
            </thead>
            <tbody>{currentPrice}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};
BeiFrontAdminEditDisplay.propTypes = {
  currentPrice: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default BeiFrontAdminEditDisplay;
