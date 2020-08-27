import React from "react";
import SiteTheme from "../auth/common/SiteTheme";
import SiteImage from "../auth/common/SiteImage";
import Footer from "./Footer";
import LandingNav from "./LandingNav";

const LandingPage = () => {
  return (
    <>
      <LandingNav />
      <div className="container mt-5">
        <div className="row">
          <div className="col-6 m-auto">
            <SiteTheme />
          </div>
          <div className="col-6">
            <SiteImage />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default LandingPage;
