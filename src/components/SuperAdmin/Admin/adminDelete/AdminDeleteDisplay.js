/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../../Landing/Footer";
import { Spinner } from "../../../../spinner/Spinner";
import UnAuthorized from "../../../auth/common/UnAuthorized";
import CancelBtn from "../../common/CancelBtn";

export const AdminDeleteDisplay = props => {
  const { userRole, loading, companyAdminStaff, handleCancelClick } = props;
  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h5 className="text-secondary">Admin details</h5>
                <div className="alert alert-danger" role="alert">
                  <strong>Warning! </strong>Are you sure that you want to delete this record?
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Company-id</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Staff_id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>{companyAdminStaff}</tbody>
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
      <Footer />
    </>
  );
};
AdminDeleteDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  companyAdminStaff: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default AdminDeleteDisplay;
