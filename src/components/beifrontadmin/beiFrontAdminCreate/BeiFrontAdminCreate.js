/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import ConstFrontAdmin from "../ConstBeiFrontAdmin";
import BearerToken from "../../../services/BearerToken";
import BeiFrontAdminCreateView from "./BeiFrontAdminCreateView";

export const BeiFrontAdminCreate = props => {
  const [loading, setLoading] = useState(true);
  const [front_office_id, setFront_Office_Id] = useState("");
  const [diesel, setDiesel] = useState("");
  const [petrol, setPetrol] = useState("");
  const [kerosene, setKerosene] = useState("");
  const [ido, setIdo] = useState("");
  const [fo, setFo] = useState("");
  const [lpg, setLpg] = useState("");
  const [latestprices, setLatestPrices] = useState([]);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = e => {
    // eslint-disable-next-line camelcase
    e.preventDefault();
    const data = { front_office_id, diesel, petrol, kerosene, fo, ido, lpg };

    const { history } = props;
    const config = BearerToken();

    axios
      .post(`/currentprices`, data, config)
      .then(response => {
        if (response) {
          toast.success("Price created successfully");
          setTimeout(() => history.push(`/bfadmin`), 50);
        }
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  // Get front ofice id

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
    const config = BearerToken();

    try {
      axios.get(`/currentprices`, config).then(response => {
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

        // Object containing detail of front office latest current price
        const priceObj = latestprices[0];

        setLatestPrices(latestprices);
        setDiesel(priceObj.diesel);
        setPetrol(priceObj.petrol);
        setKerosene(priceObj.kerosene);
        setIdo(priceObj.ido);
        setFo(priceObj.fo);
        setLpg(priceObj.lpg);
        setLoading(false);
      });
    } catch (err) {
      setErrors(err.response.data.errors || err.response.data.message);
      setMessage(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFrontOfficeData();
    setTimeout(() => getCurrentPriceData(), 1500);
  }, []);

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/bfadmin");
    setLoading(false);
  };

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
      </tr>
    );
  });

  return (
    <>
      <BeiFrontAdminCreateView
        userRole={userRole}
        loading={loading}
        company={company}
        location={location}
        currentPrice={currentPrice}
        errors={errors}
        message={message}
        onSubmit={onSubmit}
        front_office_id={front_office_id}
        diesel={diesel}
        petrol={petrol}
        kerosene={kerosene}
        fo={fo}
        ido={ido}
        lpg={lpg}
        handleCancelClick={handleCancelClick}
        setDiesel={setDiesel}
        setPetrol={setPetrol}
        setFo={setFo}
        setIdo={setIdo}
        setKerosene={setKerosene}
        setLpg={setLpg}
      />
    </>
  );
};

BeiFrontAdminCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default BeiFrontAdminCreate;
