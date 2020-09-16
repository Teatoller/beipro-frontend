/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import { Spinner } from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import UnAuthorized from "../../auth/common/UnAuthorized";

export const FeedbackDisplay = props => {
  const { setActivePage, userRole, loading, currentItems, itemCountPerPage, userFeedback } = props;

  // Change page

  const paginate = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h5 className="text-secondary">Feedback details</h5>
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
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination
              itemCountPerPage={itemCountPerPage}
              totalItems={userFeedback.length}
              paginate={paginate}
            />
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}
      <Footer />
    </>
  );
};
FeedbackDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  userFeedback: PropTypes.string.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default FeedbackDisplay;
