/* eslint-disable no-shadow */
/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";

import ConstBeiFrontAdmin from "./ConstBeiFrontAdmin";
import BearerToken from "../../services/BearerToken";

import { BeiFrontAdminView } from "./BeiFrontAdminView";

export const BeiFrontAdmin = props => {
  const [loading, setLoading] = useState(true);
  const [latestprices, setLatestPrices] = useState([]);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [loggedStaffLocation, setLoggedStaffLocation] = useState("");

  const getBeiStaffData = () => {
    const config = BearerToken();

    axios
      .get(`/beistaffs`, config)
      .then(response => {
        const beiStaffData = response.data;
        const loggedUserEmail = localStorage.getItem("email");
        const fStaffLocation = localStorage.getItem("location");

        const userArray = beiStaffData.filter(object => object.email === loggedUserEmail);

        // Object containing detail of logged user
        const userObj = userArray[0];

        // Key
        // eslint-disable-next-line consistent-return
        function frontkey() {
          if (userObj) {
            const beiStaffLocation = userObj.location;

            return beiStaffLocation;
          }
        }

        const lockey = frontkey();

        localStorage.setItem("location", lockey);
        setLoggedStaffLocation(fStaffLocation);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  const getDepotPriceData = () => {
    const config = BearerToken();

    axios.get(`/depotprices`, config).then(response => {
      const depotData = response.data;
      const beiStaffLocation = localStorage.getItem("location");

      const depotPricesArray = depotData.filter(object => object.location === beiStaffLocation);

      setLatestPrices(depotPricesArray);
    });
  };

  // Select current price record to edit

  const handleEditClick = e => {
    const { history } = props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);
    const coName = attribute.getAttribute("coName");
    const coLocation = attribute.getAttribute("coLocation");
    localStorage.setItem("coName", coName);
    localStorage.setItem("coLocation", coLocation);

    history.push("/beiadminedit");
    setLoading(false);
  };

  const handleCreateClick = e => {
    const { history } = props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const coName = attribute.getAttribute("coName");
    const coLocation = attribute.getAttribute("coLocation");
    localStorage.setItem("coName", coName);
    localStorage.setItem("coLocation", coLocation);

    history.push("/beiadmincreate");
    setLoading(false);
  };

  // Select current price record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);
    const coName = attribute.getAttribute("coName");
    const coLocation = attribute.getAttribute("coLocation");
    localStorage.setItem("coName", coName);
    localStorage.setItem("coLocation", coLocation);

    history.push("/beiadmindelete");
  };

  useEffect(() => {
    getBeiStaffData();
    getDepotPriceData();
  }, []);

  const company = localStorage.getItem("companyName");
  const location = localStorage.getItem("location");
  const userRole = ConstBeiFrontAdmin();

  const currentPrice = latestprices.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="fadmindepotdata text-center">{index + 1}</td>
        <td className="fadmindepotdata text-center">{item.name}</td>
        <td className="fadmindepotdata text-center">{item.diesel}</td>
        <td className="fadmindepotdata text-center">{item.petrol}</td>
        <td className="fadmindepotdata text-center">{item.kerosene}</td>
        <td className="fadmindepotdata text-center">{item.ido}</td>
        <td className="fadmindepotdata text-center">{item.fo}</td>
        <td className="fadmindepotdata text-center">{item.lpg}</td>
        <td className="fadmindepotdata text-center">
          <button
            className="btn btn-sm btn-success"
            type="button"
            coName={item.name}
            coLocation={item.location}
            onClick={handleCreateClick}
          >
            Create
          </button>
        </td>
        <td className="fadmindepotdata text-center">
          <button
            className="btn btn-sm btn-primary"
            type="button"
            priceid={item.id}
            coName={item.name}
            coLocation={item.location}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </td>
        <td className="fadmindepotdata text-center">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            priceid={item.id}
            coName={item.name}
            coLocation={item.location}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <BeiFrontAdminView
        userRole={userRole}
        loading={loading}
        company={company}
        location={location}
        currentPrice={currentPrice}
        errors={errors}
        message={message}
        handleCreateClick={handleCreateClick}
        loggedStaffLocation={loggedStaffLocation}
      />
    </>
  );
};
BeiFrontAdmin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default BeiFrontAdmin;
