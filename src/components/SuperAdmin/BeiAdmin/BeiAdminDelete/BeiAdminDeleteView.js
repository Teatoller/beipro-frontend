/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import { BeiAdminDeleteDisplay } from "./BeiAdminDeleteDisplay";

export const BeiAdminDeleteView = props => {
  const { userRole, loading, companyAdminStaff, handleCancelClick } = props;
  return (
    <>
      <Nav />
      <BeiAdminDeleteDisplay
        userRole={userRole}
        loading={loading}
        companyAdminStaff={companyAdminStaff}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
BeiAdminDeleteView.propTypes = {
  loading: PropTypes.bool.isRequired,
  companyAdminStaff: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default BeiAdminDeleteView;
