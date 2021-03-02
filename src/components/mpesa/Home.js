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
        <div className="row">
          <SubscriptionMenu />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
