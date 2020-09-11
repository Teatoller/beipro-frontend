/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import { Spinner } from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import UnAuthorized from "../../auth/common/UnAuthorized";

export const CompanyDisplay = props => {
  const {
    setActivePage,
    userRole,
    loading,
    currentItems,
    handleCreateClick,
    itemCountPerPage,
    company
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
                <h5 className="text-secondary">Company details</h5>
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
                        <th scope="col">Action</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>
            </div>

            <span className="font-italic form-text text-muted">
              Click button to add a new Company
            </span>
            <div className="m-1">
              <button className="btn btn-sm btn-success" type="submit" onClick={handleCreateClick}>
                Add
              </button>
            </div>
            <Pagination
              itemCountPerPage={itemCountPerPage}
              totalItems={company.length}
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
CompanyDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default CompanyDisplay;
