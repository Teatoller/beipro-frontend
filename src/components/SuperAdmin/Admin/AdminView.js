/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import { AdminDisplay } from "./AdminDisplay";

export const AdminView = props => {
  const {
    setActivePage,
    userRole,
    loading,
    currentItems,
    handleCreateClick,
    itemCountPerPage,
    companyAdminStaff
  } = props;

  return (
    <>
      <Nav />
      <AdminDisplay
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        currentItems={currentItems}
        handleCreateClick={handleCreateClick}
        itemCountPerPage={itemCountPerPage}
        companyAdminStaff={companyAdminStaff}
      />
    </>
  );
};
AdminView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  companyAdminStaff: PropTypes.string.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default AdminView;
