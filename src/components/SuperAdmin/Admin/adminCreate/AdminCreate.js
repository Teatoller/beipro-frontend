/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { AdminCreateView } from "./AdminCreateView";

export const AdminCreate = props => {
  const [loading, setLoading] = useState(true);
  const [company_id, setCompany_Id] = useState("");
  const [staff_id, setStaff_Id] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [admins, setAdmins] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      company_id,
      firstname,
      lastname,
      staff_id,
      email,
      role
    };

    const { history } = props;
    const config = BearerToken();

    axios
      .post(`/admins`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/sadmin`), 50);
        }
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

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

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/sadmin");
    setLoading(false);
  };

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
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = companyAdminStaff.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <AdminCreateView
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        onSubmit={onSubmit}
        setCompany_Id={setCompany_Id}
        setFirstname={setFirstname}
        setLastname={setLastname}
        setRole={setRole}
        setStaff_Id={setStaff_Id}
        setEmail={setEmail}
        handleCancelClick={handleCancelClick}
        errors={errors}
        message={message}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        companyAdminStaff={companyAdminStaff}
      />
    </>
  );
};
AdminCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default AdminCreate;
