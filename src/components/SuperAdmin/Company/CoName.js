import React from "react";
import PropTypes from "prop-types";

const CoName = props => {
  const { onChange } = props;
  return (
    <select
      name="name"
      className="form-control form-control-sm"
      // id="name"
      placeholder="Enter Company name"
      onChange={onChange}
      aria-describedby="companyNameInput"
      aria-required="true"
      aria-invalid="false"
    >
      <option value=" ">Select name</option>
      <option value="Total Kenya">Total Kenya</option>
      <option value="Vivo Energy">Vivo Energy</option>
      <option value="Kenol Kobil">Kenol Kobil</option>
      <option value="Oil Libya">Oil Libya</option>
      <option value="Hashi Energy">Hashi Energy</option>
      <option value="Gapco Kenya">Gapco Kenya</option>
      <option value="Petro Kenya">Petro Kenya</option>
      <option value="Oryx Energies">Oryx Energies</option>
      <option value="Texas Energy">Texas Energy</option>
      <option value="Galana Oil">Galana Oil</option>
      <option value="Fossil Fuel">Fossil Fuel</option>
      <option value="NOCK">NOCK</option>
      <option value="Tosha Petroleum">Tosha Petroleum</option>
      <option value="ASPAM Energy">ASPAM Energy</option>
      <option value="Gulf Energy">Gulf Energy</option>
      <option value="Dalbit Petroleum">Dalbit Petroleum</option>
      <option value="Kencor Petroleum">Kencor Petroleum</option>
      <option value="Royal Oilfields">Royal Oilfields</option>
      <option value="EAGOL Kenya">EAGOL Kenya</option>
      <option value="Ainu Shamsi">Ainu Shamsi</option>
      <option value="Twoba">Twoba</option>
      <option value="Olympic Petroleum">Olympic Petroleum</option>
      <option value="Lake Oil Gas">Lake Oil Gas</option>
      <option value="Regnol Oil">Regnol Oil</option>
      <option value="One Petroleum">One Petroleum</option>
      <option value="Aftah Petroleum">Aftah Petroleum</option>
      <option value="BE Energy">BE Energy</option>
      <option value="Ocean Energy">Ocean Energy</option>
      <option value="Tri-Star">Tri-Star</option>
      <option value="Banoda Oil">Banoda Oil</option>
      <option value="Brain Field">Brain Field</option>
      <option value="Futures">Futures</option>
      <option value="Prime Regional">Prime Regional</option>
      <option value="Mogas">Mogas</option>
      <option value="Petrocam Kenya">Petrocam Kenya</option>
      <option value="Global Oil">Global Oil</option>
      <option value="Jaguar Energy">Jaguar Energy</option>
      <option value="Bachulal">Bachulal</option>
      <option value="Ilade Oil">Ilade Oil</option>
      <option value="Axon Energy">Axon Energy</option>
      <option value="Hammex">Hammex</option>
      <option value="Fastnet">Fastnet</option>
      <option value="Oilcom">Oilcom</option>
      <option value="City Oil">City Oil</option>
      <option value="Bushra Energy">Bushra Energy</option>
      <option value="Asharami Energy">Asharami Energy</option>
      <option value="Amana">Amana</option>
      <option value="Tiba">Tiba</option>
    </select>
  );
};
CoName.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default CoName;
