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
      <div className="container">
        <div className="row">
          <div className="card-body col-12 align-self-end font-italic">Subscribe</div>
          <span>{loading ? <Spinner /> : null}</span>
          <div className="col-12 align-self-end">
            <div className="col-sm-12">
              <h3>Daily</h3>
              <p>Ksh 15/=</p>
              <button
                className="btn btn-success"
                type="button"
                payamount="15"
                onClick={handlePayClick}
              >
                Pay Now
              </button>
            </div>
          </div>
          <div className="card-body col-12 align-self-end">
            <div className="col-sm-12">
              <h3>Weekly</h3>
              <p>Ksh 65/=</p>
              <button
                className="btn btn-success"
                type="button"
                payamount="65"
                onClick={handlePayClick}
              >
                Pay Now
              </button>
            </div>
          </div>
          <div className="card-body col-12 align-self-end">
            <div className="col-sm-12">
              <h3>Monthly</h3>
              <p>Ksh 240/=</p>
              <button
                className="btn btn-success"
                type="button"
                payamount="240"
                onClick={handlePayClick}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubscriptionMenu;
