import React from "react";
import { Nav } from "./Nav";
import Footer from "./Footer";

const Welcome = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <section className="jumbotron jumbotron-fluid">
          <div className="container">
            <p className="lead text-secondary font-italic">Reseller bureau</p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Welcome;
