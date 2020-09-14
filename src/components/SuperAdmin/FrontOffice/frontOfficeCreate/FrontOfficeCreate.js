/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { FrontOfficeCreateView } from "./FrontOfficeCreateView";

export const FrontOfficeCreate = props => {
  const [loading, setLoading] = useState(true);
  const [company_id, setCompany_Id] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [frontOffices, setFrontOffices] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);
  const [errors, setErrors] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      company_id,
      name,
      code,
      location
    };

    const { history } = props;
    const config = BearerToken();

    axios
      .post(`/frontoffices`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/frontoffice`), 50);
        }
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.request.response);
      });
  };

  const getFrontOfficesData = () => {
    const config = BearerToken();

    axios.get(`/frontoffices`, config).then(response => {
      const frontOfficesData = response.data;

      setFrontOffices(frontOfficesData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFrontOfficesData();
  }, []);

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/frontoffice");
    setLoading(false);
  };

  const userRole = ConstSAdmin();

  const frontOffice = frontOffices.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="foffices text-center">{index + 1}</td>
        <td className="foffices text-center">{item.company_id}</td>
        <td className="foffices text-center">{item.name}</td>
        <td className="foffices text-center">{item.code}</td>
        <td className="foffices text-center">{item.location}</td>
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = frontOffice.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <FrontOfficeCreateView
        userRole={userRole}
        loading={loading}
        onSubmit={onSubmit}
        setCompany_Id={setCompany_Id}
        setCode={setCode}
        setName={setName}
        setLocation={setLocation}
        errors={errors}
        handleCancelClick={handleCancelClick}
        currentItems={currentItems}
        setActivePage={setActivePage}
        itemCountPerPage={itemCountPerPage}
        frontOffice
      />
    </>
  );
};
FrontOfficeCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOfficeCreate;
