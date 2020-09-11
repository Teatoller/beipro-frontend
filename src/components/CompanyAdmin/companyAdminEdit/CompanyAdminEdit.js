/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";

import ConstCoAdmin from "../common/ConstCoAdmin";

import BearerToken from "../../../services/BearerToken";
import { CompanyAdminEditView } from "./CompanyAdminEditView";

export const CompanyAdminEdit = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  // errors: {
  //   front_office_id: "",
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   role: "",
  //   staff_id: "",
  //   location: ""
  // }
  //   };
  // }

  const [loading, setLoading] = useState(true);
  const [admin_id, setAdmin_Id] = useState("");
  const [staff_id, setStaff_Id] = useState("");
  const [front_office_id, setFront_Office_Id] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [fadmins, setFadmins] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(5);
  const [errors, setErrors] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      admin_id,
      front_office_id,
      firstname,
      lastname,
      staff_id,
      email,
      role,
      location
    };

    // Get selected frontadmin and update state with new changes

    const fadminid = localStorage.getItem("fadminid");
    const { history } = props;
    const config = BearerToken();

    axios
      .patch(`/companyadmins/${fadminid}`, data, config)
      .then(response => {
        if (response) {
          history.push("/admin");
        }
        setLoading(false);
      })
      .catch(errors => {
        // this.setState({
        //   errors: {
        //     front_office_id: err.response.request.response,
        //     firstname: err.response.request.response,
        //     lastname: err.response.request.response,
        //     email: err.response.request.response,
        //     role: err.response.request.response,
        //     staff_id: err.response.request.response,
        //     location: err.response.request.response
        //   }
        // });
        setErrors(errors.response.request.response);
        setLoading(false);
      });
  };

  const getOfficeData = () => {
    const adminId = localStorage.getItem("admin_id");
    const lockey = parseInt(adminId, 10);

    setAdmin_Id(lockey);
  };

  const getFrontAdminsData = () => {
    const config = BearerToken();

    axios.get(`/companyadmins`, config).then(response => {
      const adminsArray = response.data;

      setFadmins(adminsArray);
      setLoading(false);
    });
  };

  // Get selected front admin detail and display in placeholder

  const getFrontAdminData = () => {
    const fadminid = localStorage.getItem("fadminid");

    const config = BearerToken();

    axios.get(`/companyadmins/${fadminid}`, config).then(response => {
      const selectedFadminData = response.data;

      const adminObj = selectedFadminData[0];

      setFront_Office_Id(adminObj.front_office_id);
      setFirstname(adminObj.firstname);
      setLastname(adminObj.lastname);
      setStaff_Id(adminObj.staff_id);
      setEmail(adminObj.email);
      setRole(adminObj.role);
      setLocation(adminObj.location);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOfficeData();
    setTimeout(() => getFrontAdminsData(), 500);
    setTimeout(() => getFrontAdminData(), 500);
  }, []);

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
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = companyStaff.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <CompanyAdminEditView
        userRole={userRole}
        loading={loading}
        company={company}
        admin_id={admin_id}
        front_office_id={front_office_id}
        staff_id={staff_id}
        location={location}
        errors={errors}
        handleCancelClick={handleCancelClick}
        firstname={firstname}
        lastname={lastname}
        role={role}
        onSubmit={onSubmit}
        email={email}
        setFirstname={setFirstname}
        setEmail={setEmail}
        setLastname={setLastname}
        setRole={setRole}
        setStaff_Id={setStaff_Id}
        setFront_Office_Id={setFront_Office_Id}
        setLocation={setLocation}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        companyStaff={companyStaff}
        setActivePage={setActivePage}
      />
    </>
  );
};
CompanyAdminEdit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminEdit;
