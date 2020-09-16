/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../../Landing/Footer";
import { Spinner } from "../../../../spinner/Spinner";
import UnAuthorized from "../../../auth/common/UnAuthorized";

export const FeedbackDeleteDisplay = props => {
  const { userRole, loading, feedbk, handleCancelClick } = props;
  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h5 className="text-secondary">Feedback details</h5>
                <div className="alert alert-danger" role="alert">
                  <strong>Warning! </strong>Are you sure that you want to delete this record?
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                        <th scope="col">Date Created</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>{feedbk}</tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <button type="button" className="btn btn-sm btn-primary" onClick={handleCancelClick}>
                Cancel
              </button>
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
FeedbackDeleteDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  feedbk: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default FeedbackDeleteDisplay;
