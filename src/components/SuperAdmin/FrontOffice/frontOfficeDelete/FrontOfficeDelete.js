/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { FrontOfficeDeleteView } from "./FrontOfficeDeleteView";

export const FrontOfficeDelete = props => {
  const [loading, setLoading] = useState(true);
  const [frontOffices, setFrontOffices] = useState([]);

  const getFrontOfficesData = () => {
    const frontofficeId = localStorage.getItem("frontofficeId");
    const config = BearerToken();

    axios.get(`/frontoffices/${frontofficeId}`, config).then(response => {
      const frontofficeData = response.data;
      setFrontOffices(frontofficeData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFrontOfficesData();
  }, []);

  // Select front office record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    // Delete selected front office record
    const config = BearerToken();

    axios.delete(`/frontoffices/${frontofficeId}`, config).then(response => {
      if (response) {
        history.push("/frontoffice");
      }
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/frontoffice");
    setLoading(false);
  };

  // eslint-disable-next-line camelcase
  const userRole = ConstSAdmin();

  const frontOffice = frontOffices.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="foffices text-center">{index + 1}</td>
        <td className="foffices text-center">{item.company_id}</td>
        <td className="foffices text-center">{item.name}</td>
        <td className="foffices text-center">{item.code}</td>
        <td className="foffices text-center">{item.location}</td>
        <td className="foffices text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            frontofficeId={item.id}
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
      <FrontOfficeDeleteView
        userRole={userRole}
        loading={loading}
        frontOffice={frontOffice}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
FrontOfficeDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOfficeDelete;
