import React from "react";

const SiteTheme = () => {
  return (
    <div className="container">
      <p
        style={{
          fontSize: ".95em",
          fontStyle: "italic",
          color: "gray",
          padding: "8px"
        }}
      >
        <span style={{ textDecoration: "italic", fontWeight: "bold" }}>Beipro </span>is a{" "}
        <span>dynamic platform </span>that
        <span>
          {" "}
          remotely{" "}
          <span style={{ textDecoration: "italic", fontWeight: "bold" }}>
            {" "}
            connects buyers
          </span>{" "}
        </span>
        <span style={{ textDecoration: "italic", fontWeight: "bold" }}>to</span>
        <span>
          {" "}
          the prevailing{" "}
          <span style={{ textDecoration: "italic", fontWeight: "bold" }}> sellers</span> bulk
          petroleum stock prices
        </span>
      </p>
    </div>
  );
};
export default SiteTheme;
