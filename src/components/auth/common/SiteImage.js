import React from "react";

const SiteImage = () => {
  const beiprostorage = `./img/beiprostorage.svg`;
  return (
    <div className="m-2">
      <img
        className="img-fluid rounded d-block mx-auto img-thumbnail"
        src={beiprostorage}
        alt="Petroleum storage tanks installation. Sets the theme for the web site"
      />
    </div>
  );
};
export default SiteImage;
