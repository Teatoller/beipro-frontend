import React from "react";
import { Nav } from "../Landing/Nav";
import Footer from "../Landing/Footer";
import { SubscriptionMenu } from "./SubscriptionMenu";
import SiteImage from "../auth/common/SiteImage";

const Home = () => {
  return (
    <>
      <div className="container">
        <Nav />
        <div className="row">
          <div className="col-8">
            <SiteImage />
          </div>
          <div className="col-4">
            <SubscriptionMenu />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
