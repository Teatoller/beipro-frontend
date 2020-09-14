/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../../Landing/Footer";
import { Spinner } from "../../../../spinner/Spinner";
import UnAuthorized from "../../../auth/common/UnAuthorized";
import CancelBtn from "../../common/CancelBtn";

export const FrontOfficeDeleteDisplay = props => {
  const { userRole, loading, frontOffice, handleCancelClick } = props;
  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h5 className="text-secondary">Front Office details</h5>
                <div className="alert alert-danger" role="alert">
                  <strong>Warning! </strong>Are you sure that you want to delete this record?
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Company Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Location</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>{frontOffice}</tbody>
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
FrontOfficeDeleteDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  userRole: PropTypes.bool.isRequired,
  frontOffice: PropTypes.string.isRequired
};
export default FrontOfficeDeleteDisplay;
