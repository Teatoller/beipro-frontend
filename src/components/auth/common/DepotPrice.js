import React from "react";

const DepotPrice = () => {
  const priceSample = `./img/price_img2.png`;
  return (
    <div className="m-2">
      <img
        className="img-fluid rounded d-block mx-auto priImg"
        src={priceSample}
        alt="Depot price pictorial"
      />
    </div>
  );
};
export default DepotPrice;
