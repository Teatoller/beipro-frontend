/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import { CompanyDisplay } from "./CompanyDisplay";

export const CompanyView = props => {
  const {
    setActivePage,
    userRole,
    loading,
    currentItems,
    handleCreateClick,
    itemCountPerPage,
    company
  } = props;

  return (
    <>
      <Nav />
      <CompanyDisplay
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        currentItems={currentItems}
        handleCreateClick={handleCreateClick}
        itemCountPerPage={itemCountPerPage}
        company={company}
      />
    </>
  );
};
CompanyView.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default CompanyView;
