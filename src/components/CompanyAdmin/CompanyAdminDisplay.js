/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../spinner/Spinner";
import Pagination from "../Pagination";
import UnAuthorized from "../auth/common/UnAuthorized";

export const CompanyAdminDisplay = props => {
  const {
    userRole,
    loading,
    company,
    currentItems,
    companyStaff,
    handleCreateClick,
    itemCountPerPage,
    setActivePage
  } = props;

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
                <h5 className="text-secondary">{company}:Staff details</h5>
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
                        <th scope="col">Action</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* <span className="font-italic text-secondary">
              Click button to add a new Front Office Admin
            </span> */}

            <div className="m-1">
              <button className="btn btn-sm btn-success" type="submit" onClick={handleCreateClick}>
                Create
              </button>
            </div>
            <div className="fixed-bottom mb-3">
              <Pagination
                itemCountPerPage={itemCountPerPage}
                totalItems={companyStaff.length}
                paginate={paginate}
              />
            </div>
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}
    </>
  );
};
CompanyAdminDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  companyStaff: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default CompanyAdminDisplay;
