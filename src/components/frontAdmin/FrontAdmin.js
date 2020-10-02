/* eslint-disable no-shadow */
/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";

import ConstFrontAdmin from "./common/ConstFrontAdmin";
import BearerToken from "../../services/BearerToken";

import { FrontAdminView } from "./FrontAdminView";

export const FrontAdmin = props => {
  const [loading, setLoading] = useState(true);
  const [latestprices, setLatestPrices] = useState([]);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [loggedStaffLocation, setLoggedStaffLocation] = useState("");

  const getOfficeData = () => {
    const config = BearerToken();

    axios
      .get(`/frontadmins`, config)
      .then(response => {
        const frontadminsdata = response.data;
        const loggedUserEmail = localStorage.getItem("email");
        const fStaffLocation = localStorage.getItem("location");

        const userArray = frontadminsdata.filter(object => object.email === loggedUserEmail);

        // Object containing detail of logged user
        const userObj = userArray[0];

        // Key
        // eslint-disable-next-line consistent-return
        function frontkey() {
          if (userObj) {
            const frontOfficeId = userObj.front_office_id;

            return frontOfficeId;
          }
        }

        const lockey = parseInt(frontkey(), 10);

        localStorage.setItem("front_office_id", lockey);
        setLoggedStaffLocation(fStaffLocation);
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  // Display current price as placeholder value

  const getCurrentPriceData = () => {
    const config = BearerToken();

    axios
      .get(`/currentprices`, config)
      .then(response => {
        const currentPriceData = response.data;
        const frontOfficeId = parseInt(localStorage.getItem("front_office_id"), 10);

        // Array with object containing details of the front office current prices

        const priceArray = currentPriceData.filter(
          object => object.front_office_id === frontOfficeId
        );

        // sort prices in reverse to get the latest price

        const latestprices = [];

        const sortbyid = priceArray.sort((c1, c2) => (c1.id > c2.id ? 1 : -1)).pop();

        latestprices.push(sortbyid);

        setLatestPrices(latestprices);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  // Select current price record to edit

  const handleEditClick = e => {
    const { history } = props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);

    history.push("/fadminedit");
    setLoading(false);
  };

  const handleCreateClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/fadmincreate");
    setLoading(false);
  };

  // Select current price record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);

    history.push("/fadmindelete");
  };

  // phase 1 Establish the company front offices name and location

  const getFofficeData = () => {
    const config = BearerToken();

    const frontid = localStorage.getItem("front_office_id");
    const frontId = parseInt(frontid, 10);
    axios.get(`/frontoffices/${frontId}`, config).then(response => {
      const fofficesData = response.data;

      const officesObj = fofficesData[0];

      if (officesObj) {
        localStorage.setItem("name1", officesObj.name);
        localStorage.setItem("location", officesObj.location);
      }
    });
  };

  useEffect(() => {
    getOfficeData();
    setTimeout(() => getCurrentPriceData(), 1800);
    getFofficeData();
  }, []);

  const company = localStorage.getItem("name1");
  const location = localStorage.getItem("location");
  const userRole = ConstFrontAdmin();

  const currentPrice = latestprices.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="fadmindepotdata text-center">{index + 1}</td>
        <td className="fadmindepotdata text-center">{item.front_office_id}</td>
        <td className="fadmindepotdata text-center">{item.diesel}</td>
        <td className="fadmindepotdata text-center">{item.petrol}</td>
        <td className="fadmindepotdata text-center">{item.kerosene}</td>
        <td className="fadmindepotdata text-center">{item.ido}</td>
        <td className="fadmindepotdata text-center">{item.fo}</td>
        <td className="fadmindepotdata text-center">{item.lpg}</td>
        <td className="fadmindepotdata text-center">
          <button
            className="btn btn-sm btn-primary"
            type="button"
            priceid={item.id}
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
      <FrontAdminView
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
FrontAdmin.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontAdmin;
