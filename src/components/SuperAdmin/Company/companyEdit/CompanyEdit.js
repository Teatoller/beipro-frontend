/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { CompanyEditView } from "./CompanyEditView";

export const CompanyEdit = props => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [established, setEstablished] = useState("");
  const [companies, setCompanies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);
  const [errors, setErrors] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      logo,
      description,
      location,
      country,
      established
    };

    const companyId = localStorage.getItem("companyId");
    const { history } = props;

    const config = BearerToken();

    axios
      .patch(`/companies/${companyId}`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/company`), 50);
        }
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.request.response);
        setLoading(false);
      });
  };

  const getCompaniesData = () => {
    const config = BearerToken();

    axios.get(`/companies`, config).then(response => {
      const companiesData = response.data;

      setCompanies(companiesData);
      setLoading(false);
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/company");
    setLoading(false);
  };

  const getCompanyData = () => {
    const companyId = localStorage.getItem("companyId");
    const config = BearerToken();

    axios.get(`/companies/${companyId}`, config).then(response => {
      const selectedCompanyData = response.data;

      const adminObj = selectedCompanyData[0];

      setName(adminObj.name);
      setLogo(adminObj.logo);
      setDescription(adminObj.description);
      setLocation(adminObj.location);
      setCountry(adminObj.country);
      setEstablished(adminObj.established);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCompaniesData();
    getCompanyData();
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
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = company.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <CompanyEditView
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        onSubmit={onSubmit}
        setName={setName}
        setLogo={setLogo}
        setDescription={setDescription}
        setLocation={setLocation}
        setCountry={setCountry}
        setEstablished={setEstablished}
        errors={errors}
        handleCancelClick={handleCancelClick}
        itemCountPerPage={itemCountPerPage}
        currentItems={currentItems}
        company={company}
        name={name}
        logo={logo}
        established={established}
        description={description}
        location={location}
        country={country}
      />
    </>
  );
};
CompanyEdit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyEdit;
