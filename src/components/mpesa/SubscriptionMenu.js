import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "../../spinner/Spinner";

export const SubscriptionMenu = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handlePayClick = e => {
    e.preventDefault();
    const attribute = e.currentTarget;
    const payamount = attribute.getAttribute("payamount");
    localStorage.setItem("payamount", payamount);

    history.push("/pay");
    setLoading(true);
  };

  return (
    <>
      <div className="columns">
        <span>{loading ? <Spinner /> : null}</span>
        <ul className="price">
          <li className="header bronze">Bronze</li>
          <li>
            Depot Prices
            <ul className="price">
              <li className="locationfont">Nairobi, Kisumu, Mombasa</li>
            </ul>
          </li>
          <li>
            <FontAwesomeIcon icon={faChartLine} /> Price chart
          </li>
          <li className="locationfont">Expires same day Midnight</li>
          <li className="grey">@ Ksh 15/day</li>
          <li>
            <button
              className="btn btn-success"
              type="button"
              payamount="15"
              onClick={handlePayClick}
            >
              Pay Now
            </button>
          </li>
        </ul>
      </div>

      <div className="columns">
        <ul className="price">
          <li className="header silver">Silver</li>
          <li>
            Depot Prices
            <ul className="price">
              <li className="locationfont">Nairobi, Kisumu, Mombasa</li>
            </ul>
          </li>
          <li>
            <FontAwesomeIcon icon={faChartLine} /> Price chart
          </li>
          <li className="locationfont">Expires 7th day Midnight</li>
          <li className="grey">@ Ksh 65/week</li>
          <li>
            <button
              className="btn btn-success"
              type="button"
              payamount="65"
              onClick={handlePayClick}
            >
              Pay Now
            </button>
          </li>
        </ul>
      </div>

      <div className="columns">
        <ul className="price">
          <li className="header gold">Gold</li>
          <li>
            Depot Prices
            <ul className="price">
              <li className="locationfont">Nairobi, Kisumu, Mombasa</li>
            </ul>
          </li>
          <li>
            <FontAwesomeIcon icon={faChartLine} /> Price chart
          </li>
          <li className="locationfont">Expires 4th week Midnight</li>
          <li className="grey">@ Ksh 240/month</li>
          <li>
            <button
              className="btn btn-success"
              type="button"
              payamount="240"
              onClick={handlePayClick}
            >
              Pay Now
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SubscriptionMenu;
