/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../../Landing/Footer";

import { Spinner } from "../../../../spinner/Spinner";
import Pagination from "../../../Pagination";

import UnAuthorized from "../../../auth/common/UnAuthorized";

import { AdminCreateSidebar } from "./AdminCreateSidebar";
import { AdminCreateForm } from "./AdminCreateForm";

export const AdminCreateDisplay = props => {
  const {
    setActivePage,
    userRole,
    loading,
    onSubmit,
    setCompany_Id,
    setFirstname,
    setLastname,
    setRole,
    setStaff_Id,
    setEmail,
    handleCancelClick,
    errors,
    message,
    currentItems,
    itemCountPerPage,
    companyAdminStaff
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
          <div className="container" aria-label="Create company front admin form">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <AdminCreateForm
                onSubmit={onSubmit}
                setCompany_Id={setCompany_Id}
                setFirstname={setFirstname}
                setLastname={setLastname}
                setEmail={setEmail}
                setRole={setRole}
                setStaff_Id={setStaff_Id}
                errors={errors}
                message={message}
                handleCancelClick={handleCancelClick}
              />
              <AdminCreateSidebar currentItems={currentItems} />
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
AdminCreateDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  companyAdminStaff: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setCompany_Id: PropTypes.func.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setLastname: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setStaff_Id: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default AdminCreateDisplay;
