import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Landing/Footer";
import { Nav } from "../Landing/Nav";
import DepotPrice from "../auth/common/DepotPrice";

export const Subscribed = () => {
  return (
    <>
      <Nav />
      <div className="container mt-5 w-75">
        <div>
          <h6 className="bg-subscribe text-muted text-center mt-1 p-2 border font-weight-bold">
            Subscription required
          </h6>
          <p className="bg-light font-italic text-muted text-center mt-1 p-2">
            ...stay updated every day.
          </p>
        </div>
        <div className="bg-light p-2">
          <DepotPrice />
        </div>
        <div className="bg-light mt-1 p-5 border-bottom">
          <Link to="home" className="btn btn-success w-100 font-weight-bold">
            Subscribe
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Subscribed;
