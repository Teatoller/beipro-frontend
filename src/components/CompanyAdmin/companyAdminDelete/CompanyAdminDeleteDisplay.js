/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../../spinner/Spinner";
import UnAuthorized from "../../auth/common/UnAuthorized";
import CancelBtn from "../../SuperAdmin/common/CancelBtn";

export const CompanyAdminDeleteDisplay = props => {
  const { userRole, loading, company, companyStaff, handleCancelClick } = props;
  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row mx-auto">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h5 className="text-secondary">{company}:Staff details</h5>
                <div className="alert alert-danger" role="alert">
                  <strong>Warning! </strong>Are you sure that you want to delete this record?
                </div>
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
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>{companyStaff}</tbody>
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
CompanyAdminDeleteDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  companyStaff: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default CompanyAdminDeleteDisplay;
