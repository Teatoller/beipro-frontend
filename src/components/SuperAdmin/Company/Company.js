/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import ConstSAdmin from "../ConstSAdmin";
import BearerToken from "../../../services/BearerToken";
import { CompanyView } from "./CompanyView";

export const Company = props => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);

  const getCompaniesData = () => {
    const config = BearerToken();

    axios.get("/companies", config).then(response => {
      const companyData = response.data;
      setCompanies(companyData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCompaniesData();
  }, []);

  const handleEditClick = e => {
    const { history } = props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const companyId = attribute.getAttribute("companyId");
    localStorage.setItem("companyId", companyId);

    history.push("/companyedit");
  };

  const handleCreateClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/companycreate");
  };

  // Select company record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const companyId = attribute.getAttribute("companyId");
    localStorage.setItem("companyId", companyId);

    history.push("/companydelete");
  };

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
            className="btn btn-sm btn-primary"
            type="button"
            companyId={item.id}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </td>
        <td className="company text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            companyId={item.id}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = company.slice(indexOfFirstItem, indexOfLastItem);

  // Change page

  return (
    <>
      <CompanyView
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        currentItems={currentItems}
        handleCreateClick={handleCreateClick}
        itemCountPerPage={itemCountPerPage}
        company={company}
      />
    </>
  );
};
Company.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Company;
