/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import EditBtn from "../../SuperAdmin/common/EditBtn";
import { dieselError } from "../../frontAdmin/common/errors/dieselError";
// import { dieselError } from "../common/errors/dieselError";
import { petrolError } from "../../frontAdmin/common/errors/petrolError";
import { keroseneError } from "../../frontAdmin/common/errors/keroseneError";
import { idoError } from "../../frontAdmin/common/errors/idoError";
import { foError } from "../../frontAdmin/common/errors/foError";
import { lpgError } from "../../frontAdmin/common/errors/lpgError";
import { front_office_idError } from "../../frontAdmin/common/errors/front_office_id";
import { messageError } from "../../auth/common/messageError";

export const BeiFrontAdminEditForm = props => {
  const {
    company,
    location,
    errors,
    message,
    onSubmit,
    front_office_id,
    diesel,
    petrol,
    kerosene,
    fo,
    ido,
    lpg,
    handleCancelClick,
    setDiesel,
    setPetrol,
    setFo,
    setIdo,
    setKerosene,
    setLpg
  } = props;

  return (
    <>
      <div className="col-sm-6 m-auto">
        <h1 className="text-secondary h6">
          Edit Entry Pad: {company} - <em>{location}</em>
        </h1>
        <form noValidate onSubmit={onSubmit}>
          <h6 className="text-secondary">Price Input</h6>
          <div className="form-group row">
            <label htmlFor="diesel" className="col-sm-2 col-form-label col-form-label-sm">
              Diesel:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="diesel"
                id="diesel"
                className={`form-control ${errors.diesel ? "is-invalid" : ""}`}
                placeholder={diesel}
                onChange={e => {
                  setDiesel(e.target.value);
                }}
                aria-describedby="dieselPriceInput"
              />
              {dieselError(errors)}
            </div>
            <label htmlFor="petrol" className="col-sm-2 col-form-label col-form-label-sm">
              Petrol:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="petrol"
                id="petrol"
                className={`form-control ${errors.petrol ? "is-invalid" : ""}`}
                placeholder={petrol}
                onChange={e => {
                  setPetrol(e.target.value);
                }}
                aria-describedby="petrolPriceInput"
              />
              {petrolError(errors)}
            </div>

            <label htmlFor="kerosene" className="col-sm-2 col-form-label col-form-label-sm">
              Kerosene:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="kerosene"
                id="kerosene"
                className={`form-control ${errors.kerosene ? "is-invalid" : ""}`}
                placeholder={kerosene}
                onChange={e => {
                  setKerosene(e.target.value);
                }}
                aria-describedby="kerosenePriceInput"
              />
              {keroseneError(errors)}
            </div>

            <label htmlFor="ido" className="col-sm-2 col-form-label col-form-label-sm">
              Ido:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="ido"
                id="ido"
                className={`form-control ${errors.ido ? "is-invalid" : ""}`}
                placeholder={ido}
                onChange={e => {
                  setIdo(e.target.value);
                }}
                aria-describedby="idoPriceInput"
              />
              {idoError(errors)}
            </div>

            <label htmlFor="fuelOil" className="col-sm-2 col-form-label col-form-label-sm">
              Fuel Oil:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="fo"
                id="fuelOil"
                className={`form-control ${errors.fo ? "is-invalid" : ""}`}
                placeholder={fo}
                onChange={e => {
                  setFo(e.target.value);
                }}
                aria-describedby="fuelOilPriceInput"
              />
              {foError(errors)}
            </div>

            <label htmlFor="lpg" className="col-sm-2 col-form-label col-form-label-sm">
              Bulk Lpg:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="lpg"
                id="lpg"
                className={`form-control ${errors.lpg ? "is-invalid" : ""}`}
                placeholder={lpg}
                onChange={e => {
                  setLpg(e.target.value);
                }}
                aria-describedby="bulkLpgPriceInput"
              />
              {lpgError(errors)}
              {messageError(message)}
            </div>
          </div>
          <div className="row">
            <EditBtn handleCancelClick={handleCancelClick} />
          </div>
          <fieldset disabled className="hide invisible">
            <div className="form-group row m-0">
              <label htmlFor="frontOfficeId" className="col-sm-2 col-form-label-sm">
                Office-Id:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="decimal"
                  name="front_office_id"
                  id="frontOfficeId"
                  className={`form-control ${errors.front_office_id ? "is-invalid" : ""}`}
                  placeholder="Disabled input"
                  value={front_office_id}
                  aria-describedby="forntOfficeIdInput"
                />
                {front_office_idError(errors)}
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
BeiFrontAdminEditForm.propTypes = {
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  front_office_id: PropTypes.string.isRequired,
  diesel: PropTypes.string.isRequired,
  petrol: PropTypes.string.isRequired,
  kerosene: PropTypes.string.isRequired,
  fo: PropTypes.string.isRequired,
  ido: PropTypes.string.isRequired,
  lpg: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  setDiesel: PropTypes.func.isRequired,
  setPetrol: PropTypes.func.isRequired,
  setFo: PropTypes.func.isRequired,
  setIdo: PropTypes.func.isRequired,
  setKerosene: PropTypes.func.isRequired,
  setLpg: PropTypes.func.isRequired
};
export default BeiFrontAdminEditForm;
