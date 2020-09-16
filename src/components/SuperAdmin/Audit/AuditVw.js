/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";

import { AuditVwDisplay } from "./AuditVwDisplay";

export const AuditVw = props => {
  const { userRole, loading, currentItems, itemCountPerPage, beiproAudit, setActivePage } = props;

  return (
    <>
      <Nav />
      <AuditVwDisplay
        userRole={userRole}
        loading={loading}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        beiproAudit={beiproAudit}
        setActivePage={setActivePage}
      />
    </>
  );
};
AuditVw.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  beiproAudit: PropTypes.string.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default AuditVw;
