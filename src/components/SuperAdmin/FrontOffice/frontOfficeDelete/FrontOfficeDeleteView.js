/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import { FrontOfficeDeleteDisplay } from "./FrontOfficeDeleteDisplay";

export const FrontOfficeDeleteView = props => {
  const { userRole, loading, frontOffice, handleCancelClick } = props;
  return (
    <>
      <Nav />
      <FrontOfficeDeleteDisplay
        userRole={userRole}
        loading={loading}
        frontOffice={frontOffice}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
FrontOfficeDeleteView.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  userRole: PropTypes.bool.isRequired,
  frontOffice: PropTypes.string.isRequired
};
export default FrontOfficeDeleteView;
