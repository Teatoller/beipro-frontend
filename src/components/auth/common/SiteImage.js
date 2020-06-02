import React from "react";
import beiprostorage from "../../../images/beiprostorage.svg";

const SiteImage = () => {
  return (
    <div className="m-2">
      <img
        className="img-fluid rounded mx-auto d-block img-thumbnail"
        src={beiprostorage}
        alt="Petroleum storage tanks installation. Sets the theme for the web site"
      />
    </div>
  );
};
export default SiteImage;
