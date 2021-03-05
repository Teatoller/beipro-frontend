import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
            <ul className="local">
              <li className="locationfont">
                <span className="successlocalfont">&#10004;</span> Nairobi
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Kisumu
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Eldoret
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Nakuru
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont shiftmarg">&#10006;</span> Mombasa
              </li>
            </ul>
          </li>
          <li className="locationfont">Expires Midnight same day</li>
          <li className="grey text-muted">@ Ksh 15/day</li>
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
            <ul className="local">
              <li className="locationfont">
                <span className="successlocalfont">&#10004;</span> Nairobi
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Kisumu
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Eldoret
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Nakuru
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont shiftmarg">&#10006;</span> Mombasa
              </li>
            </ul>
          </li>
          <li className="locationfont">Expires Midnight 7th day</li>
          <li className="grey text-muted">@ Ksh 65/week</li>
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
            <ul className="local">
              <li className="locationfont">
                <span className="successlocalfont">&#10004;</span> Nairobi
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Kisumu
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Eldoret
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont">&#10006;</span> Nakuru
              </li>
              <li className="locationfont">
                <span className="dangerlocalfont shiftmarg">&#10006;</span> Mombasa
              </li>
            </ul>
          </li>
          <li className="locationfont">Expires Midnight 4th week</li>
          <li className="grey text-muted">@ Ksh 240/month</li>
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
