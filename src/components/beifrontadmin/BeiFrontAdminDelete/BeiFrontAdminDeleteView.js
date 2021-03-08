/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import Footer from "../../Landing/Footer";

import { BeiFrontAdminDeleteDisplay } from "./BeiFrontAdminDeleteDisplay";

export const BeiFrontAdminDeleteView = props => {
  const { userRole, loading, company, location, currentPrice, handleCancelClick } = props;
  return (
    <>
      <Nav />
      <BeiFrontAdminDeleteDisplay
        userRole={userRole}
        loading={loading}
        company={company}
        location={location}
        currentPrice={currentPrice}
        handleCancelClick={handleCancelClick}
      />
      <Footer />
    </>
  );
};
BeiFrontAdminDeleteView.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPrice: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default BeiFrontAdminDeleteView;
