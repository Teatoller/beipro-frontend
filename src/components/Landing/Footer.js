import React from "react";
import "../css/site.css";

const Footer = () => {
  return (
    <footer id="footer" className="text-center">
      <span>Beipro &copy;{new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
