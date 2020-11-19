/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";

import { AdminCreateDisplay } from "./AdminCreateDisplay";

export const AdminCreateView = props => {
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

  return (
    <>
      <Nav />
      <AdminCreateDisplay
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        onSubmit={onSubmit}
        setCompany_Id={setCompany_Id}
        setFirstname={setFirstname}
        setLastname={setLastname}
        setRole={setRole}
        setStaff_Id={setStaff_Id}
        setEmail={setEmail}
        handleCancelClick={handleCancelClick}
        errors={errors}
        message={message}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        companyAdminStaff={companyAdminStaff}
      />
    </>
  );
};
AdminCreateView.propTypes = {
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
export default AdminCreateView;
