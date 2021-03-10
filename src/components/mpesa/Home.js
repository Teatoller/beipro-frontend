import React from "react";
import { Nav } from "../Landing/Nav";
import Footer from "../Landing/Footer";
import { SubscriptionMenu } from "./SubscriptionMenu";
import "../css/site.css";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <h5 className="font-italic text-center mt-1 text-muted">Choose a Subscription</h5>
        <div className="row">
          <SubscriptionMenu />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
