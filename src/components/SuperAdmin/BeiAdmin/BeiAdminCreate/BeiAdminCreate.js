/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { BeiAdminCreateView } from "./BeiAdminCreateView";

export const BeiAdminCreate = props => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
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
      firstname,
      lastname,
      staff_id,
      email,
      role,
      location
    };

    const { history } = props;
    const config = BearerToken();

    axios
      .post(`/beistaffs`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/beistaff`), 50);
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

    axios.get(`/beistaffs`, config).then(response => {
      const beiStaffData = response.data;

      setAdmins(beiStaffData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAdminsData();
  }, []);

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/beisatff");
    setLoading(false);
  };

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
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = companyAdminStaff.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <BeiAdminCreateView
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        onSubmit={onSubmit}
        setLocation={setLocation}
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
BeiAdminCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default BeiAdminCreate;
