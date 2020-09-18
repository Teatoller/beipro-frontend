/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";

import ConstCoAdmin from "../common/ConstCoAdmin";

import BearerToken from "../../../services/BearerToken";
import { CompanyAdminCreateView } from "./CompanyAdminCreateView";

export const CompanyAdminCreate = props => {
  const [loading, setLoading] = useState(true);
  const [admin_id, setAdmin_Id] = useState("");
  const [company_id, setCompany_Id] = useState("");
  const [staff_id, setStaff_Id] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [fadmins, setFadmins] = useState([]);
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [f3, setF3] = useState("");
  const [f4, setF4] = useState("");
  const [f5, setF5] = useState("");
  const [f1Loc, setF1Loc] = useState("");
  const [f2Loc, setF2Loc] = useState("");
  const [f3Loc, setF3Loc] = useState("");
  const [f4Loc, setF4Loc] = useState("");
  const [f5Loc, setF5Loc] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(5);
  const [errors, setErrors] = useState("");
  const input = useRef("");

  const onSubmit = e => {
    const front_office_id =
      input.current.value === f1 ||
      input.current.value === f2 ||
      input.current.value === f3 ||
      input.current.value === f4 ||
      input.current.value === f5
        ? input.current.value
        : "error";

    e.preventDefault();
    const data = {
      admin_id,
      company_id,
      front_office_id,
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
      .post(`/companyadmins`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/admin`), 50);
        }
        setLoading(false);
      })
      .catch(errors => {
        setErrors(errors.response.request.response);
        setLoading(false);
      });
  };

  const getOfficeData = () => {
    const adminId = localStorage.getItem("admin_id");
    const companyId = localStorage.getItem("company_id");
    const lockey = parseInt(adminId, 10);
    const lockey2 = parseInt(companyId, 10);

    setAdmin_Id(lockey);
    setCompany_Id(lockey2);
    setF1(localStorage.getItem("f1"));
    setF1Loc(localStorage.getItem("f1loc"));
    setF2(localStorage.getItem("f2"));
    setF2Loc(localStorage.getItem("f2loc"));
    setF3(localStorage.getItem("f3"));
    setF3Loc(localStorage.getItem("f3loc"));
    setF4(localStorage.getItem("f4"));
    setF4Loc(localStorage.getItem("f4loc"));
    setF5(localStorage.getItem("f5"));
    setF5Loc(localStorage.getItem("f5loc"));
    setLoading(false);
  };

  const getFrontAdminsData = () => {
    const config = BearerToken();

    axios.get(`/cofadmins`, config).then(response => {
      const adminsArray = response.data;

      setFadmins(adminsArray);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOfficeData();
    setTimeout(() => getFrontAdminsData(), 1500);
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
      <CompanyAdminCreateView
        userRole={userRole}
        loading={loading}
        company={company}
        admin_id={admin_id}
        company_id={company_id}
        errors={errors}
        handleCancelClick={handleCancelClick}
        onSubmit={onSubmit}
        setFirstname={setFirstname}
        setEmail={setEmail}
        setLastname={setLastname}
        setRole={setRole}
        setStaff_Id={setStaff_Id}
        setLocation={setLocation}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        companyStaff={companyStaff}
        setActivePage={setActivePage}
        input={input}
        f1={f1}
        f1Loc={f1Loc}
        f2={f2}
        f2Loc={f2Loc}
        f3={f3}
        f3Loc={f3Loc}
        f4={f4}
        f4Loc={f4Loc}
        f5={f5}
        f5Loc={f5Loc}
      />
    </>
  );
};
CompanyAdminCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdminCreate;
