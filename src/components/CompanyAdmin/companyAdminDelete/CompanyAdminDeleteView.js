import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import { CompanyAdminDeleteDisplay } from "./CompanyAdminDeleteDisplay";

export const CompanyAdminDeleteView = props => {
  const { userRole, loading, company, companyStaff, handleCancelClick } = props;
  return (
    <>
      <Nav />
      <CompanyAdminDeleteDisplay
        userRole={userRole}
        loading={loading}
        company={company}
        companyStaff={companyStaff}
        handleCancelClick={handleCancelClick}
      />
      <Footer />
    </>
  );
};
CompanyAdminDeleteView.propTypes = {
  loading: PropTypes.bool.isRequired,
  companyStaff: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default CompanyAdminDeleteView;
