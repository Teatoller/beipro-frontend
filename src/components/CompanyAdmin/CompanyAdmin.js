/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import ConstCoAdmin from "./common/ConstCoAdmin";
import BearerToken from "../../services/BearerToken";
import { CompanyAdminView } from "./CompanyAdminView";

export const CompanyAdmin = props => {
  const [loading, setLoading] = useState(true);
  const [fadmins, setFadmins] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(5);

  const getOfficeData = () => {
    const config = BearerToken();

    axios.get("/combineadmins", config).then(response => {
      const adminsdata = response.data;

      const adminId = adminsdata.id;
      const companyId = adminsdata.company_id;

      const lockey = parseInt(adminId, 10);

      const lockey2 = parseInt(companyId, 10);

      localStorage.setItem("admin_id", lockey);

      localStorage.setItem("company_id", lockey2);
    });
  };

  const getFrontAdminsData = () => {
    const config = BearerToken();

    axios.get("/cofadmins", config).then(response => {
      const adminsArray = response.data;

      setFadmins(adminsArray);
      setLoading(false);
    });
  };

  const handleEditClick = e => {
    const { history } = props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const fadminid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", fadminid);

    history.push("/adminedit");
  };

  const handleCreateClick = e => {
    const { history } = props;

    e.preventDefault();
    history.push("/admincreate");
  };

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const fadminid = attribute.getAttribute("fadminid");
    localStorage.setItem("fadminid", fadminid);

    history.push("/admindelete");
  };

  const getFofficeData = () => {
    const config = BearerToken();

    axios.get("/frontshores", config).then(response => {
      const officesArray = response.data;

      if (officesArray[0]) {
        localStorage.setItem("f1", officesArray[0].id);
        localStorage.setItem("f1loc", officesArray[0].location);
        localStorage.setItem("company", officesArray[0].name);
      }
      if (officesArray[1]) {
        localStorage.setItem("f2", officesArray[1].id);
        localStorage.setItem("f2loc", officesArray[1].location);
      }
      if (officesArray[2]) {
        localStorage.setItem("f3", officesArray[2].id);
        localStorage.setItem("f3loc", officesArray[2].location);
      }
      if (officesArray[3]) {
        localStorage.setItem("f4", officesArray[3].id);
        localStorage.setItem("f4loc", officesArray[3].location);
      }
      if (officesArray[4]) {
        localStorage.setItem("f5", officesArray[4].id);
        localStorage.setItem("f5loc", officesArray[4].location);
      }
    });
  };

  useEffect(() => {
    getOfficeData();
    setTimeout(() => getFrontAdminsData(), 1500);
    getFofficeData();
  }, []);

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
            className="btn btn-sm btn-primary"
            type="button"
            fadminid={item.id}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </td>
        <td className="fadmin text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            fadminid={item.id}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = companyStaff.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <CompanyAdminView
        userRole={userRole}
        loading={loading}
        company={company}
        currentItems={currentItems}
        companyStaff={companyStaff}
        handleCreateClick={handleCreateClick}
        itemCountPerPage={itemCountPerPage}
        setActivePage={setActivePage}
      />
    </>
  );
};
CompanyAdmin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default CompanyAdmin;
