/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../../spinner/Spinner";
import UnAuthorized from "../../auth/common/UnAuthorized";
import CancelBtn from "../../SuperAdmin/common/CancelBtn";

export const FrontAdminDeleteDisplay = props => {
  const { userRole, loading, company, location, currentPrice, handleCancelClick } = props;
  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row mx-auto">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h5 className="text-secondary">
                  Current Price: {company}-{location}
                </h5>
                <div className="alert alert-danger" role="alert">
                  <strong>Warning! </strong>Are you sure that you want to delete this record?
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
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
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>{currentPrice}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
              <CancelBtn handleCancelClick={handleCancelClick} />
            </div>
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}
    </>
  );
};
FrontAdminDeleteDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPrice: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default FrontAdminDeleteDisplay;
