/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

export const CompanyAdminEditDisplay = props => {
  const { currentItems } = props;
  return (
    <>
      <div className="col-sm-6 mx-auto">
        <h5 className="text-secondary">Staff details</h5>
        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover table-bordered text-secondary">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Office-id</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Staff_id</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>{currentItems}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};
CompanyAdminEditDisplay.propTypes = {
  currentItems: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default CompanyAdminEditDisplay;
