/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { CompanyDeleteView } from "./CompanyDeleteView";

export const CompanyDelete = props => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  const getCompaniesData = () => {
    const config = BearerToken();

    const companyId = localStorage.getItem("companyId");
    axios.get(`/companies/${companyId}`, config).then(response => {
      const companyData = response.data;
      setCompanies(companyData);
      setLoading(false);
    });
  };

  // Select company record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const companyId = attribute.getAttribute("companyId");
    localStorage.setItem("companyId", companyId);

    // Delete selected company record
    const config = BearerToken();

    axios.delete(`/companies/${companyId}`, config).then(response => {
      if (response) {
        history.push("/company");
      }
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/company");
    setLoading(false);
  };

  useEffect(() => {
    getCompaniesData();
  }, []);

  const userRole = ConstSAdmin();

  const company = companies.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="company text-center">{index + 1}</td>
        <td className="company text-center">{item.id}</td>
        <td className="company text-center">{item.name}</td>
        <td className="company text-center">{item.logo}</td>
        <td className="company text-center">{item.description}</td>
        <td className="company text-center">{item.location}</td>
        <td className="company text-center">{item.country}</td>
        <td className="company text-center">{item.established}</td>
        <td className="company text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            companyId={item.id}
            onClick={handleDeleteClick}
          >
            Yes
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <CompanyDeleteView
        userRole={userRole}
        loading={loading}
        company={company}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
CompanyDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyDelete;
