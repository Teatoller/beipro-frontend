/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../Landing/Nav";
import Footer from "../Landing/Footer";
import { FrontAdminDisplay } from "./FrontAdminDisplay";

export const FrontAdminView = props => {
  const { userRole, loading, company, location, currentPrice, errors, handleCreateClick } = props;

  return (
    <>
      <Nav />
      <FrontAdminDisplay
        userRole={userRole}
        loading={loading}
        company={company}
        location={location}
        currentPrice={currentPrice}
        errors={errors}
        handleCreateClick={handleCreateClick}
      />
      <Footer />
    </>
  );
};
FrontAdminView.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  currentPrice: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired
};
export default FrontAdminView;
