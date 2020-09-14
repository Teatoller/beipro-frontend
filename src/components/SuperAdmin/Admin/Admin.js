/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";

import ConstSAdmin from "../ConstSAdmin";
import BearerToken from "../../../services/BearerToken";
import { AdminView } from "./AdminView";

export const Admin = props => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);

  const getAdminsData = () => {
    const config = BearerToken();

    axios.get(`/admins`, config).then(response => {
      const adminData = response.data;
      setAdmins(adminData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAdminsData();
  }, []);

  const handleEditClick = e => {
    const { history } = props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);

    history.push("/sadminedit");
  };

  const handleCreateClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/sadmincreate");
  };

  // Select front admin record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);
    history.push("/sadmindelete");
  };

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
            className="btn btn-sm btn-primary"
            type="button"
            sadminid={item.id}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </td>
        <td className="admin text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            sadminid={item.id}
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
  const currentItems = companyAdminStaff.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <AdminView
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        currentItems={currentItems}
        handleCreateClick={handleCreateClick}
        itemCountPerPage={itemCountPerPage}
        companyAdminStaff={companyAdminStaff}
      />
    </>
  );
};
Admin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Admin;
