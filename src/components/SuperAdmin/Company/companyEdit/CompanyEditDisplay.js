import React from "react";
import PropTypes from "prop-types";

export const CompanyEditDisplay = props => {
  const { currentItems } = props;
  return (
    <>
      <div className="col-sm-6 mx-auto">
        <h5 className="text-secondary">Companies</h5>
        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover table-bordered text-secondary">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Company Id</th>
                <th scope="col">Name</th>
                <th scope="col">Logo</th>
                <th scope="col">Description</th>
                <th scope="col">Location</th>
                <th scope="col">Country</th>
                <th scope="col">Established</th>
              </tr>
            </thead>
            <tbody>{currentItems}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};
CompanyEditDisplay.propTypes = {
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default CompanyEditDisplay;
