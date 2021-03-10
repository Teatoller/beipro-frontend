import React from "react";

const Mpesa = () => {
  const priceSample = `./img/mpesa.png`;
  return (
    <div className="m-2">
      <img
        className="img-fluid rounded d-block mx-auto pay-logo"
        src={priceSample}
        alt="Mpesa logo"
      />
    </div>
  );
};
export default Mpesa;
