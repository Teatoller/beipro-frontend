/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";

import { BeiAdminCreateDisplay } from "./BeiAdminCreateDisplay";

export const BeiAdminCreateView = props => {
  const {
    setActivePage,
    userRole,
    loading,
    onSubmit,
    setLocation,
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
      <BeiAdminCreateDisplay
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        onSubmit={onSubmit}
        setLocation={setLocation}
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
BeiAdminCreateView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  companyAdminStaff: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setLastname: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setStaff_Id: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default BeiAdminCreateView;
