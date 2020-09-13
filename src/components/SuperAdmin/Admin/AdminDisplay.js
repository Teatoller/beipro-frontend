/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import { Spinner } from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import UnAuthorized from "../../auth/common/UnAuthorized";

export const AdminDisplay = props => {
  const {
    userRole,
    loading,
    currentItems,
    handleCreateClick,
    itemCountPerPage,
    companyAdminStaff,
    setActivePage
  } = props;

  // Change page

  const paginate = pageNumber => {
    setActivePage(pageNumber);
  };
  return (
    <>
      {userRole ? (
        <>
          {" "}
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
                        <th scope="col">Company-id</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Staff_id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="m-1">
              <button className="btn btn-sm btn-success" type="submit" onClick={handleCreateClick}>
                Create
              </button>
            </div>
            <Pagination
              itemCountPerPage={itemCountPerPage}
              totalItems={companyAdminStaff.length}
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
AdminDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  companyAdminStaff: PropTypes.string.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default AdminDisplay;
