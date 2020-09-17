/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";

import ConstCoAdmin from "../common/ConstCoAdmin";

import BearerToken from "../../../services/BearerToken";
import { CompanyAdminDeleteView } from "./CompanyAdminDeleteView";

export const CompanyAdminDelete = props => {
  const [loading, setLoading] = useState(true);
  const [, setAdmin_Id] = useState("");
  const [, setCompany_Id] = useState("");
  const [fadmins, setFadmins] = useState([]);

  const getOfficeData = () => {
    const adminId = localStorage.getItem("admin_id");
    const companyId = localStorage.getItem("company_id");
    const lockey = parseInt(adminId, 10);
    const lockey2 = parseInt(companyId, 10);

    setAdmin_Id(lockey);
    setCompany_Id(lockey2);
  };

  const getFrontAdminsData = () => {
    const fadminid = localStorage.getItem("fadminid");

    const config = BearerToken();

    axios.get(`/companyadmins/${fadminid}`, config).then(response => {
      const frontadminData = response.data;

      // const isolatekey = parseInt(localStorage.getItem("admin_id"), 10);
      const isolatekey = parseInt(localStorage.getItem("company_id"), 10);

      // Array with object containing details of the logged user

      const adminsArray = frontadminData.filter(object => object.company_id === isolatekey);

      setFadmins(adminsArray);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOfficeData();
    setTimeout(() => getFrontAdminsData(), 1500);
  }, []);

  // Select front admin record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const fadminid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", fadminid);

    // Delete selected front admin record

    const config = BearerToken();

    axios.delete(`/companyadmins/${fadminid}`, config).then(response => {
      if (response) {
        history.push("/admin");
      }
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/admin");
    setLoading(false);
  };

  const company = localStorage.getItem("company");
  const userRole = ConstCoAdmin();

  const companyStaff = fadmins.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="fadmin text-center">{index + 1}</td>
        <td className="fadmin text-center">{item.front_office_id}</td>
        <td className="fadmin text-center">{item.firstname}</td>
        <td className="fadmin text-center">{item.lastname}</td>
        <td className="fadmin text-center">{item.staff_id}</td>
        <td className="fadmin text-center">{item.email}</td>
        <td className="fadmin text-center">{item.role}</td>
        <td className="fadmin text-center">{item.location}</td>
        <td className="fadmin text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            fadminid={item.id}
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
      <CompanyAdminDeleteView
        userRole={userRole}
        loading={loading}
        company={company}
        companyStaff={companyStaff}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
CompanyAdminDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminDelete;
