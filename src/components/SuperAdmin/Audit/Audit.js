/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import ConstSAdmin from "../ConstSAdmin";
import BearerToken from "../../../services/BearerToken";
import { AuditVw } from "./AuditVw";

export const Audit = props => {
  const [loading, setLoading] = useState(true);
  const [audits, setAudits] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);

  const getAuditsData = () => {
    const config = BearerToken();

    axios.get("/audits", config).then(response => {
      const auditData = response.data;

      setAudits(auditData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAuditsData();
  }, []);

  const handleViewClick = e => {
    const { history } = props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const auditid = attribute.getAttribute("auditid");
    localStorage.setItem("auditid", auditid);

    history.push("/auditview");
  };

  const userRole = ConstSAdmin();

  const beiproAudit = audits.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="audit text-center">{index + 1}</td>
        <td className="audit text-center">{item.event}</td>
        <td className="audit text-center">{item.auditable_type}</td>
        <td className="audit text-center">{item.auditable_id}</td>
        <td className="audit text-center">{item.old_values}</td>
        <td className="audit text-center">{item.new_values}</td>
        <td className="audit text-center">{item.tags}</td>
        <td className="audit text-center">
          <button
            className="btn btn-sm btn-outline-info"
            type="button"
            auditid={item.id}
            onClick={handleViewClick}
          >
            View
          </button>
        </td>
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = beiproAudit.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <AuditVw
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
Audit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Audit;
