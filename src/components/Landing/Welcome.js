import React from "react";
import { Nav } from "./Nav";
import Footer from "./Footer";

const Welcome = () => {
  return (
    <>
      <div className="container">
        <Nav />
        <section className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-muted">Digital</h1>
            <p className="lead text-secondary">Reseller stock bureau</p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Welcome;
