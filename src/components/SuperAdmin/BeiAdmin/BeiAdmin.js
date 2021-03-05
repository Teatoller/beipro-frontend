/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";

import ConstSAdmin from "../ConstSAdmin";
import BearerToken from "../../../services/BearerToken";
import { BeiAdminView } from "./BeiAdminView";

export const BeiAdmin = props => {
  const [loading, setLoading] = useState(true);
  const [beiAdmins, setBeiAdmins] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);

  const getAdminsData = () => {
    const config = BearerToken();

    axios.get(`/beistaffs`, config).then(response => {
      const beiAdminData = response.data;
      setBeiAdmins(beiAdminData);
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
    const sbeiadminid = attribute.getAttribute("sbeiadminid");
    localStorage.setItem("sbeiadminid", sbeiadminid);

    history.push("/bstaffedit");
  };

  const handleCreateClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/bstaffcreate");
  };

  // Select front admin record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sbeiadminid = attribute.getAttribute("sbeiadminid");
    localStorage.setItem("sbeiadminid", sbeiadminid);
    history.push("/bstaffdelete");
  };

  // eslint-disable-next-line camelcase
  const userRole = ConstSAdmin();

  const companyAdminStaff = beiAdmins.map((item, index) => {
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
            className="btn btn-sm btn-primary"
            type="button"
            sbeiadminid={item.id}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </td>
        <td className="admin text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            sbeiadminid={item.id}
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
      <BeiAdminView
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
BeiAdmin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default BeiAdmin;
