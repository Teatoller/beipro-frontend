/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import { CompanyDeleteDisplay } from "./CompanyDeleteDisplay";

export const CompanyDeleteView = props => {
  const { userRole, loading, company, handleCancelClick } = props;
  return (
    <>
      <Nav />
      <CompanyDeleteDisplay
        userRole={userRole}
        loading={loading}
        company={company}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
CompanyDeleteView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default CompanyDeleteView;
