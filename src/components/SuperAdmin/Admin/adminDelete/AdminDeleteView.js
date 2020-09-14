/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import { AdminDeleteDisplay } from "./AdminDeleteDisplay";

export const AdminDeleteView = props => {
  const { userRole, loading, companyAdminStaff, handleCancelClick } = props;
  return (
    <>
      <Nav />
      <AdminDeleteDisplay
        userRole={userRole}
        loading={loading}
        companyAdminStaff={companyAdminStaff}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
AdminDeleteView.propTypes = {
  loading: PropTypes.bool.isRequired,
  companyAdminStaff: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default AdminDeleteView;
