/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../../Landing/Footer";
import { Spinner } from "../../../../spinner/Spinner";
import UnAuthorized from "../../../auth/common/UnAuthorized";
import CancelBtn from "../../common/CancelBtn";

export const CompanyDeleteDisplay = props => {
  const { userRole, loading, company, handleCancelClick } = props;
  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h5 className="text-secondary">Company details</h5>
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
                        <th scope="col">Logo</th>
                        <th scope="col">Description</th>
                        <th scope="col">Location</th>
                        <th scope="col">Country</th>
                        <th scope="col">Established</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>{company}</tbody>
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
CompanyDeleteDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default CompanyDeleteDisplay;
