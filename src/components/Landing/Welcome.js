import React from "react";
import "../css/styles.css";
import Nav from "./Nav";

const Welcome = () => {
  return (
    <div>
      <main>
        <Nav />

        <section className="bei-welcome">
          <h2>Welcome to Beipro!</h2>
        </section>
      </main>

      <footer className="footer-register">
        <span>Beipro &copy;2018</span>
      </footer>
    </div>
  );
};
export default Welcome;
