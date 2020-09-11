import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../Landing/Nav";
import Footer from "../Landing/Footer";
import { CompanyAdminDisplay } from "./CompanyAdminDisplay";

export const CompanyAdminView = props => {
  const {
    userRole,
    loading,
    company,
    currentItems,
    companyStaff,
    handleCreateClick,
    itemCountPerPage,
    setActivePage
  } = props;
  return (
    <>
      <Nav />
      <CompanyAdminDisplay
        userRole={userRole}
        loading={loading}
        company={company}
        currentItems={currentItems}
        companyStaff={companyStaff}
        handleCreateClick={handleCreateClick}
        itemCountPerPage={itemCountPerPage}
        setActivePage={setActivePage}
      />
      <Footer />
    </>
  );
};
CompanyAdminView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  companyStaff: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default CompanyAdminView;
