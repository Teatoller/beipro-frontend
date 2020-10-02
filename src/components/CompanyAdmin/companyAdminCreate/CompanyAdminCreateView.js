/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import { CompanyAdminCreateDisplay } from "./CompanyAdminCreateDisplay";

export const CompanyAdminCreateView = props => {
  const {
    userRole,
    loading,
    company,
    admin_id,
    company_id,
    errors,
    message,
    handleCancelClick,
    onSubmit,
    setFirstname,
    setEmail,
    setLastname,
    setRole,
    setStaff_Id,
    setLocation,
    currentItems,
    itemCountPerPage,
    companyStaff,
    setActivePage,
    input,
    f1,
    f1Loc,
    f2,
    f2Loc,
    f3,
    f3Loc,
    f4,
    f4Loc,
    f5,
    f5Loc
  } = props;

  return (
    <>
      <Nav />
      <CompanyAdminCreateDisplay
        userRole={userRole}
        loading={loading}
        company={company}
        admin_id={admin_id}
        company_id={company_id}
        errors={errors}
        message={message}
        handleCancelClick={handleCancelClick}
        onSubmit={onSubmit}
        setFirstname={setFirstname}
        setEmail={setEmail}
        setLastname={setLastname}
        setRole={setRole}
        setStaff_Id={setStaff_Id}
        setLocation={setLocation}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        companyStaff={companyStaff}
        setActivePage={setActivePage}
        input={input}
        f1={f1}
        f1Loc={f1Loc}
        f2={f2}
        f2Loc={f2Loc}
        f3={f3}
        f3Loc={f3Loc}
        f4={f4}
        f4Loc={f4Loc}
        f5={f5}
        f5Loc={f5Loc}
      />
    </>
  );
};
CompanyAdminCreateView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  admin_id: PropTypes.string.isRequired,
  company_id: PropTypes.string.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setLastname: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setStaff_Id: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  companyStaff: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  f1: PropTypes.number.isRequired,
  f1Loc: PropTypes.string.isRequired,
  f2: PropTypes.number.isRequired,
  f2Loc: PropTypes.string.isRequired,
  f3: PropTypes.number.isRequired,
  f3Loc: PropTypes.string.isRequired,
  f4: PropTypes.number.isRequired,
  f4Loc: PropTypes.string.isRequired,
  f5: PropTypes.number.isRequired,
  f5Loc: PropTypes.string.isRequired
};
export default CompanyAdminCreateView;
