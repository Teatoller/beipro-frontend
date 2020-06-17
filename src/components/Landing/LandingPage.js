import React from "react";
import SiteTheme from "../auth/common/SiteTheme";
import SiteImage from "../auth/common/SiteImage";
import Footer from "./Footer";
import LandingNav from "./LandingNav";

const LandingPage = () => {
  return (
    <div>
      <LandingNav />
      <span className="row col-5 landingtheme">
        <SiteTheme />
      </span>
      <span className="row col-5 landingimg">
        <SiteImage />
      </span>
      <Footer />
    </div>
  );
};
export default LandingPage;
