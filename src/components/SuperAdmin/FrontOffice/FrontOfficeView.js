/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import { FrontOfficeDisplay } from "./FrontOfficeDisplay";

export const FrontOfficeView = props => {
  const {
    setActivePage,
    userRole,
    loading,
    currentItems,
    itemCountPerPage,
    frontOffice,
    handleCreateClick
  } = props;

  return (
    <>
      <Nav />
      <FrontOfficeDisplay
        userRole={userRole}
        loading={loading}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        handleCreateClick={handleCreateClick}
        frontOffice={frontOffice}
        setActivePage={setActivePage}
      />
    </>
  );
};
FrontOfficeView.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  userRole: PropTypes.bool.isRequired,
  frontOffice: PropTypes.string.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default FrontOfficeView;
