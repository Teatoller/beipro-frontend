/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { FrontOfficeEditView } from "./FrontOfficeEditView";

export const FrontOfficeEdit = props => {
  const [loading, setLoading] = useState(true);
  const [company_id, setCompany_Id] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [frontOffices, setFrontOffices] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      company_id,
      name,
      code,
      location
    };

    const frontofficeId = localStorage.getItem("frontofficeId");
    const { history } = props;
    const config = BearerToken();

    axios
      .patch(`/frontoffices/${frontofficeId}`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push("/frontoffice"), 50);
        }
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  const getFrontOfficesData = () => {
    const config = BearerToken();

    axios.get("/frontoffices", config).then(response => {
      const frontOfficesData = response.data;

      setFrontOffices(frontOfficesData);
      setLoading(false);
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/frontoffice");
    setLoading(false);
  };

  const getFrontOfficeData = () => {
    const frontofficeId = localStorage.getItem("frontofficeId");
    const config = BearerToken();

    axios.get(`/frontoffices/${frontofficeId}`, config).then(response => {
      const selectedFrontOfficeData = response.data;

      const adminObj = selectedFrontOfficeData[0];

      setCompany_Id(adminObj.company_id);
      setName(adminObj.name);
      setCode(adminObj.code);
      setLocation(adminObj.location);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFrontOfficesData();
    getFrontOfficeData();
  }, []);

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
      <FrontOfficeEditView
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        onSubmit={onSubmit}
        company_id={company_id}
        setCompany_Id={setCompany_Id}
        code={code}
        setCode={setCode}
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        errors={errors}
        message={message}
        handleCancelClick={handleCancelClick}
        currentItems={currentItems}
        frontOffice={frontOffice}
        itemCountPerPage={itemCountPerPage}
      />
    </>
  );
};
FrontOfficeEdit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOfficeEdit;
