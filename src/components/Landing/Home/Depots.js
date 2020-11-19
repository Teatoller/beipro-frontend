/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import "../../css/site.css";
import BearerToken from "../../../services/BearerToken";
import { DepotView } from "./DepotView";

export const Depots = () => {
  const [curTime] = useState(new Date().toLocaleString());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [frontOffices, setFrontOffices] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [search, setSearch] = useState("");

  const searchSpace = event => {
    const keyword = event.target.value;
    setSearch(keyword);
  };

  const getFrontofficeData = () => {
    setLoading(true);
    const config = BearerToken();

    try {
      axios.get("/depotprices", config).then(response => {
        if (response) {
          const { data } = response;
          setFrontOffices(data);
          setLoading(false);
        }
      });
    } catch (err) {
      setErrors(err.response.data.errors || err.response.data.message);
      setMessage(err.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFrontofficeData();
  }, []);

  const handleChange = e => {
    setSelectedLocation(e.target.value);
  };

  const getLocationData = location => {
    // eslint-disable-next-line no-shadow
    const selectedLocation = frontOffices.filter(object => object.location === location);

    return selectedLocation;
  };

  const selectedLocationItems = getLocationData(selectedLocation)
    .filter(data => {
      if (search == null) return data;
      if (data.name.toLowerCase().includes(search.toLowerCase())) {
        return data;
      }
    })
    .map((item, index) => {
      const logoUrl = `./img/${item.logo}`;
      return (
        <tr key={item.id}>
          <td className="depot text-center">{index + 1}</td>
          <td className="depot text-center">
            <img className="company-logo" src={logoUrl} alt="" />
          </td>
          <td className="depot text-center">{item.name}</td>
          <td className="depot text-center">{item.diesel}</td>
          <td className="depot text-center">{item.petrol}</td>
          <td className="depot text-center">{item.kerosene}</td>
          <td className="depot text-center">{item.ido}</td>
          <td className="depot text-center">{item.fo}</td>
          <td className="depot text-center">{item.lpg}</td>
        </tr>
      );
    });

  return (
    <div>
      <DepotView
        curTime={curTime}
        loading={loading}
        errors={errors}
        message={message}
        activePage={activePage}
        setActivePage={setActivePage}
        itemCountPerPage={itemCountPerPage}
        handleChange={handleChange}
        selectedLocationItems={selectedLocationItems}
        selectedLocation={selectedLocation}
        searchSpace={searchSpace}
      />
    </div>
  );
};
export default Depots;
