import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Landing/Footer";
import { Nav } from "../Landing/Nav";
import SiteImage from "../auth/common/SiteImage";

export const Subscribed = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="card col-12">
            <SiteImage />
            <div className="card-body">
              {/* <h5 className="card-title">Subscription Notice</h5> */}
              <p className="card-text text-center text-monospace text-success font-weight-bold">
                Subscription is required to access this page.
              </p>
              <Link to="/home" className="btn btn-success">
                Home
              </Link>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default Subscribed;
