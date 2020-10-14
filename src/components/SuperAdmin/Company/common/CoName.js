import React from "react";
import PropTypes from "prop-types";

export const CoName = props => {
  const { onChange } = props;
  return (
    <select
      name="name"
      className="form-control form-control-sm"
      placeholder="Enter Company name"
      onChange={onChange}
      aria-describedby="companyNameInput"
      aria-required="true"
      aria-invalid="false"
    >
      <option value=" ">Select name</option>
      <option value="Amana">Amana</option>
      <option value="Ainu Shamsi">Ainu Shamsi</option>
      <option value="Asharami Energy">Asharami Energy</option>
      <option value="ASPAM Energy">ASPAM Energy</option>
      <option value="Aftah Petroleum">Aftah Petroleum</option>
      <option value="Axon Energy">Axon Energy</option>
      <option value="BE Energy">BE Energy</option>
      <option value="Banoda Oil">Banoda Oil</option>
      <option value="Brain Field">Brain Field</option>
      <option value="Bachulal">Bachulal</option>
      <option value="Bushra Energy">Bushra Energy</option>
      <option value="City Oil">City Oil</option>
      <option value="Dalbit Petroleum">Dalbit Petroleum</option>
      <option value="EAGOL Kenya">EAGOL Kenya</option>
      <option value="Fastnet">Fastnet</option>
      <option value="Fossil Fuel">Fossil Fuel</option>
      <option value="Futures">Futures</option>
      <option value="Galana Oil">Galana Oil</option>
      <option value="Global Oil">Global Oil</option>
      <option value="Hammex">Hammex</option>
      <option value="Hashi Energy">Hashi Energy</option>
      <option value="Ilade Oil">Ilade Oil</option>
      <option value="Jaguar Energy">Jaguar Energy</option>
      <option value="Kenol Kobil">Kenol Kobil</option>
      <option value="Kencor Petroleum">Kencor Petroleum</option>
      <option value="Lake Oil Gas">Lake Oil Gas</option>
      <option value="Lexo Kenya">Lexo Kenya</option>
      <option value="Mogas">Mogas</option>
      <option value="NOCK">NOCK</option>
      <option value="One Petroleum">One Petroleum</option>
      <option value="Ocean Energy">Ocean Energy</option>
      <option value="Olympic Petroleum">Olympic Petroleum</option>
      <option value="Oilcom">Oilcom</option>
      <option value="Oryx Energies">Oryx Energies</option>
      <option value="Oil Libya">Oil Libya</option>
      <option value="Petro Kenya">Petro Kenya</option>
      <option value="Prime Regional">Prime Regional</option>
      <option value="Petrocam Kenya">Petrocam Kenya</option>
      <option value="Regnol Oil">Regnol Oil</option>
      <option value="Royal Oilfields">Royal Oilfields</option>
      <option value="Rubis Energy">Rubis Energy</option>
      <option value="Texas Energy">Texas Energy</option>
      <option value="Tosha Petroleum">Tosha Petroleum</option>
      <option value="Total Kenya">Total Kenya</option>
      <option value="Tiba">Tiba</option>
      <option value="Tri-Star">Tri-Star</option>
      <option value="Twoba">Twoba</option>
      <option value="Vivo Energy">Vivo Energy</option>
    </select>
  );
};
CoName.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default CoName;
