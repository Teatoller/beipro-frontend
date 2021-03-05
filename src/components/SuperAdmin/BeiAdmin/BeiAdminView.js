/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import { BeiAdminDisplay } from "./BeiAdminDisplay";

export const BeiAdminView = props => {
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
      <BeiAdminDisplay
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
BeiAdminView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  companyAdminStaff: PropTypes.string.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default BeiAdminView;
