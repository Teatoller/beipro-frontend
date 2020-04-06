import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Welcome = () => {
  return (
    <div>
      <Nav />
      <section className="bei-welcome">
        <h2 className="fader" >Welcome to Beipro!</h2>
      </section>
      <Footer />
    </div>
  );
};
export default Welcome;
