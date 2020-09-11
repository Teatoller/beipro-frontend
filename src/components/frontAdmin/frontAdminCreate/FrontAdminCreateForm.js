/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";
import CreateBtn from "../../SuperAdmin/common/CreateBtn";

export const FrontAdminCreateForm = ({
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
}) => {
  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };
  return (
    <>
      <div className="col-sm-6 m-auto">
        <h5 className="text-secondary">
          Entry Pad: {company}-{location}
        </h5>
        <form noValidate onSubmit={onSubmit}>
          <fieldset className="front-fieldset">
            <fieldset disabled className="hide invisible">
              <div className="form-group row">
                <label htmlFor="frontOfficeId" className="col-sm-2 col-form-label-sm">
                  Office Id:
                </label>
                <div className="col-sm-10 mb-1">
                  <input
                    type="decimal"
                    name="front_office_id"
                    id="frontOfficeId"
                    className="form-control"
                    placeholder="Disabled input"
                    value={front_office_id}
                    aria-describedby="frontOfficeIdInput"
                  />
                </div>
              </div>
            </fieldset>

            <h5 className="text-secondary">Price Input</h5>
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
                  aria-required="true"
                  aria-invalid="false"
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
                  aria-describedby="petrolePriceInput"
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>

              <label htmlFor="kerosene" className="col-sm-2 col-form-label-sm">
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
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>

              <label htmlFor="ido" className="col-sm-2 col-form-label-sm">
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
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>

              <label htmlFor="fuelOil" className="col-sm-2 col-form-label-sm">
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
                  aria-required="true"
                  aria-invalid="false"
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
                  aria-required="true"
                  aria-invalid="false"
                />
                <span style={errors ? dangerStyle : null}>
                  <Error error={errors || null} />
                </span>
              </div>
            </div>
            <span className="font-italic text-secondary">Click button to add a new price</span>
            <div className="row">
              <CreateBtn handleCancelClick={handleCancelClick} />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
FrontAdminCreateForm.propTypes = {
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
export default FrontAdminCreateForm;
