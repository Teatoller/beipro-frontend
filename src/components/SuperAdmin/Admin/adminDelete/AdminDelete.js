/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { AdminDeleteView } from "./AdminDeleteView";

export const AdminDelete = props => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  const getAdminsData = () => {
    const sadminid = localStorage.getItem("sadminid");
    const config = BearerToken();

    axios.get(`/admins/${sadminid}`, config).then(response => {
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
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);

    // Delete selected front admin record
    const config = BearerToken();

    axios.delete(`/admins/${sadminid}`, config).then(response => {
      if (response) {
        history.push("/sadmin");
      }
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/sadmin");
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
        <td className="admin text-center">{item.company_id}</td>
        <td className="admin text-center">{item.firstname}</td>
        <td className="admin text-center">{item.lastname}</td>
        <td className="admin text-center">{item.staff_id}</td>
        <td className="admin text-center">{item.email}</td>
        <td className="admin text-center">{item.role}</td>
        <td className="admin text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            sadminid={item.id}
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
      <AdminDeleteView
        userRole={userRole}
        loading={loading}
        companyAdminStaff={companyAdminStaff}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
AdminDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default AdminDelete;
