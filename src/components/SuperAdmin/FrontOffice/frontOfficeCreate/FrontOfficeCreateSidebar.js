/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

export const FrontOfficeCreateSidebar = props => {
  const { currentItems } = props;
  return (
    <>
      <div className="col-sm-6 m-auto">
        <h5 className="text-secondary">Front Offices</h5>
        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover table-bordered text-secondary">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Company Id</th>
                <th scope="col">Name</th>
                <th scope="col">Code</th>
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
FrontOfficeCreateSidebar.propTypes = {
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default FrontOfficeCreateSidebar;
