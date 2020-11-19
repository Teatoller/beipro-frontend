/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import ConstSAdmin from "../ConstSAdmin";
import BearerToken from "../../../services/BearerToken";
import { FrontOfficeView } from "./FrontOfficeView";

export const FrontOffice = props => {
  const [loading, setLoading] = useState(true);
  const [frontOffices, setFrontOffices] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);

  const getFrontOfficesData = () => {
    const config = BearerToken();

    axios.get("/frontoffices", config).then(response => {
      const frontofficeData = response.data;

      setFrontOffices(frontofficeData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFrontOfficesData();
  }, []);

  const handleEditClick = e => {
    const { history } = props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    history.push("/frontofficeedit");
  };

  const handleCreateClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/frontofficecreate");
  };

  // Select front office record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    history.push("/frontofficedelete");
  };

  // const { frontoffices, loading } = this.state;
  const userRole = ConstSAdmin();

  const frontOffice = frontOffices.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="foffices text-center">{index + 1}</td>
        <td className="foffices text-center">{item.company_id}</td>
        <td className="foffices text-center">{item.name}</td>
        <td className="foffices text-center">{item.code}</td>
        <td className="foffices text-center">{item.location}</td>
        <td className="foffices text-center">
          <button
            className="btn btn-sm btn-primary"
            type="button"
            frontofficeId={item.id}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </td>
        <td className="foffices text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            frontofficeId={item.id}
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
  const currentItems = frontOffice.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <FrontOfficeView
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        frontOffice={frontOffice}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
};
FrontOffice.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOffice;
