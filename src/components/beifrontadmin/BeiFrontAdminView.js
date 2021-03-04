/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../Landing/Nav";
import Footer from "../Landing/Footer";
import { BeiFrontAdminDisplay } from "./BeiFrontAdminDisplay";

export const BeiFrontAdminView = props => {
  const {
    userRole,
    loading,
    company,
    location,
    currentPrice,
    errors,
    message,
    handleCreateClick,
    loggedStaffLocation
  } = props;

  return (
    <>
      <Nav />
      <BeiFrontAdminDisplay
        userRole={userRole}
        loading={loading}
        company={company}
        location={location}
        currentPrice={currentPrice}
        errors={errors}
        message={message}
        handleCreateClick={handleCreateClick}
        loggedStaffLocation={loggedStaffLocation}
      />
      <Footer />
    </>
  );
};
BeiFrontAdminView.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  currentPrice: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default BeiFrontAdminView;
