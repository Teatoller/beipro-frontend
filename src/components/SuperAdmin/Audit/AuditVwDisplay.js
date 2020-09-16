/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import { Spinner } from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import UnAuthorized from "../../auth/common/UnAuthorized";

export const AuditVwDisplay = props => {
  const { userRole, loading, currentItems, itemCountPerPage, beiproAudit, setActivePage } = props;
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
                <h5 className="text-secondary">Admin details</h5>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Event</th>
                        <th scope="col">Auditable_type</th>
                        <th scope="col">Auditable_id</th>
                        <th scope="col">Old_values</th>
                        <th scope="col">New_values</th>
                        <th scope="col">Tags</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination
              itemCountPerPage={itemCountPerPage}
              totalItems={beiproAudit.length}
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
AuditVwDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  beiproAudit: PropTypes.string.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default AuditVwDisplay;
