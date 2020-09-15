/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";
import EditBtn from "../../SuperAdmin/common/EditBtn";

export const FrontAdminEditForm = props => {
  const {
    company,
    location,
    errors,
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

  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };

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
                className="form-control"
                placeholder={diesel}
                onChange={e => {
                  setDiesel(e.target.value);
                }}
                aria-describedby="dieselPriceInput"
              />
            </div>
            <label htmlFor="petrol" className="col-sm-2 col-form-label col-form-label-sm">
              Petrol:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="petrol"
                id="petrol"
                className="form-control"
                placeholder={petrol}
                onChange={e => {
                  setPetrol(e.target.value);
                }}
                aria-describedby="petrolPriceInput"
              />
            </div>

            <label htmlFor="kerosene" className="col-sm-2 col-form-label col-form-label-sm">
              Kerosene:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="kerosene"
                id="kerosene"
                className="form-control"
                placeholder={kerosene}
                onChange={e => {
                  setKerosene(e.target.value);
                }}
                aria-describedby="kerosenePriceInput"
              />
            </div>

            <label htmlFor="ido" className="col-sm-2 col-form-label col-form-label-sm">
              Ido:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="ido"
                id="ido"
                className="form-control"
                placeholder={ido}
                onChange={e => {
                  setIdo(e.target.value);
                }}
                aria-describedby="idoPriceInput"
              />
            </div>

            <label htmlFor="fuelOil" className="col-sm-2 col-form-label col-form-label-sm">
              Fuel Oil:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="fo"
                id="fuelOil"
                className="form-control"
                placeholder={fo}
                onChange={e => {
                  setFo(e.target.value);
                }}
                aria-describedby="fuelOilPriceInput"
              />
            </div>

            <label htmlFor="lpg" className="col-sm-2 col-form-label col-form-label-sm">
              Bulk Lpg:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="lpg"
                id="lpg"
                className="form-control"
                placeholder={lpg}
                onChange={e => {
                  setLpg(e.target.value);
                }}
                aria-describedby="bulkLpgPriceInput"
              />
              <span style={errors ? dangerStyle : null}>
                <Error error={errors || null} />
              </span>
            </div>
          </div>
          {/* <span className="font-italic text-secondary">Click button to change price</span> */}
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
                  className="form-control"
                  placeholder="Disabled input"
                  value={front_office_id}
                  aria-describedby="forntOfficeIdInput"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
FrontAdminEditForm.propTypes = {
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
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
export default FrontAdminEditForm;
