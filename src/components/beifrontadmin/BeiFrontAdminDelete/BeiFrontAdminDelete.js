/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import ConstBeiFrontAdmin from "../ConstBeiFrontAdmin";
import BearerToken from "../../../services/BearerToken";
import { BeiFrontAdminDeleteView } from "./BeiFrontAdminDeleteView";

export const BeiFrontAdminDelete = props => {
  const [loading, setLoading] = useState(true);
  const [, setFront_Office_Id] = useState("");
  const [latestprices, setLatestPrices] = useState([]);

  const getFrontOfficeData = () => {
    const config = BearerToken();

    axios.get(`/frontoffices`, config).then(response => {
      const frontOfficeData = response.data;
      const coName = localStorage.getItem("coName");
      const coLocation = localStorage.getItem("coLocation");

      // Array with object containing details of the front office

      const userArray = frontOfficeData.filter(object => object.name === coName);

      const locationArray = userArray.filter(object => object.location === coLocation);

      // Object containing detail of specific front office
      const userObj = locationArray[0];

      // Key
      // eslint-disable-next-line consistent-return
      function frontkey() {
        if (userObj) {
          const frontOfficeId = userObj.id;

          return frontOfficeId;
        }
      }

      const lockey = parseInt(frontkey(), 10);

      setFront_Office_Id(lockey);
      localStorage.setItem("front_office_id", lockey);
    });
  };

  // Display current price as placeholder value

  const getCurrentPriceData = () => {
    const priceid = localStorage.getItem("priceid");
    const config = BearerToken();

    axios.get(`/currentprices/${priceid}`, config).then(response => {
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
    });
  };

  useEffect(() => {
    getFrontOfficeData();
    setTimeout(() => getCurrentPriceData(), 1800);
  }, []);

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const priceid = attribute.getAttribute("priceid");
    localStorage.setItem("priceid", priceid);

    const config = BearerToken();

    axios.delete(`/currentprices/${priceid}`, config).then(response => {
      if (response) {
        toast.success("Price deleted successfully");
        history.push("/bfadmin");
      }
      setLoading(false);
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();
    history.push("/fadmin");
    setLoading(false);
  };

  const company = localStorage.getItem("name1");
  const location = localStorage.getItem("location");
  const userRole = ConstBeiFrontAdmin();

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
            className="btn btn-sm btn-outline-danger"
            type="button"
            priceid={item.id}
            onClick={handleDeleteClick}
          >
            Yes
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <BeiFrontAdminDeleteView
        userRole={userRole}
        loading={loading}
        company={company}
        location={location}
        currentPrice={currentPrice}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
BeiFrontAdminDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default BeiFrontAdminDelete;
