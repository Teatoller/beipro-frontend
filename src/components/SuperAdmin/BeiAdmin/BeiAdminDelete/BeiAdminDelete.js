/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { BeiAdminDeleteView } from "./BeiAdminDeleteView";

export const BeiAdminDelete = props => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  const getAdminsData = () => {
    const sbeiadminid = localStorage.getItem("sbeiadminid");
    const config = BearerToken();

    axios.get(`/beistaffs/${sbeiadminid}`, config).then(response => {
      const adminData = response.data;
      setAdmins(adminData);
      setLoading(false);
    });
  };

  // Select front admin record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sbeiadminid = attribute.getAttribute("sbeiadminid");
    localStorage.setItem("sbeiadminid", sbeiadminid);

    // Delete selected front admin record
    const config = BearerToken();

    axios.delete(`/beistaffs/${sbeiadminid}`, config).then(response => {
      if (response) {
        history.push("/beistaff");
      }
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/beistaff");
    setLoading(false);
  };

  useEffect(() => {
    getAdminsData();
  }, []);

  // eslint-disable-next-line camelcase
  const userRole = ConstSAdmin();

  const companyAdminStaff = admins.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="admin text-center">{index + 1}</td>
        <td className="admin text-center">{item.id}</td>
        <td className="admin text-center">{item.firstname}</td>
        <td className="admin text-center">{item.lastname}</td>
        <td className="admin text-center">{item.staff_id}</td>
        <td className="admin text-center">{item.email}</td>
        <td className="admin text-center">{item.role}</td>
        <td className="admin text-center">{item.location}</td>
        <td className="admin text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            sbeiadminid={item.id}
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
      <BeiAdminDeleteView
        userRole={userRole}
        loading={loading}
        companyAdminStaff={companyAdminStaff}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
BeiAdminDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default BeiAdminDelete;
