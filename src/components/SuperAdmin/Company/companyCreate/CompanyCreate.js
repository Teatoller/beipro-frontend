/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { CompanyCreateView } from "./CompanyCreateView";

export const CompanyCreate = props => {
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
  const [message, setMessage] = useState("");

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

    const { history } = props;
    const config = BearerToken();

    axios
      .post("/companies", data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push("/company"), 50);
        }
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  const getCompaniesData = () => {
    const config = BearerToken();

    axios.get("/companies", config).then(response => {
      const companiesData = response.data;
      setCompanies(companiesData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCompaniesData();
  }, []);

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/company");
    setLoading(false);
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
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = company.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <CompanyCreateView
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
        message={message}
        handleCancelClick={handleCancelClick}
        itemCountPerPage={itemCountPerPage}
        currentItems={currentItems}
        company={company}
      />
    </>
  );
};
CompanyCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyCreate;
