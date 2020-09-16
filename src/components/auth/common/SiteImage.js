import React from "react";

const SiteImage = () => {
  const beiprostorage = `./img/beiprostorage.svg`;
  return (
    <div className="m-2">
      <img
        className="img-fluid rounded d-block mx-auto img-thumbnail"
        src={beiprostorage}
        alt="Storage tanks"
      />
    </div>
  );
};
export default SiteImage;
