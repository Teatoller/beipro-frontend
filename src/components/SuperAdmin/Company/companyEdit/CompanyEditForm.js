/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import EditBtn from "../../common/EditBtn";
import { establishedError } from "../../../frontAdmin/common/errors/establishedError";
import { messageError } from "../../../auth/common/messageError";
import { countryError } from "../../../frontAdmin/common/errors/countryError";
import { locationError } from "../../../frontAdmin/common/errors/locationError";
import { descriptionError } from "../../../frontAdmin/common/errors/descriptionError";
import { logoError } from "../../../frontAdmin/common/errors/logoError";
import { nameError } from "../../../frontAdmin/common/errors/nameError";

export const CompanyEditForm = props => {
  const {
    onSubmit,
    name,
    logo,
    country,
    established,
    description,
    location,
    errors,
    message,
    handleCancelClick,
    setName,
    setLocation,
    setDescription,
    setEstablished,
    setCountry,
    setLogo
  } = props;

  return (
    <>
      <div className="col-sm-6 m-auto">
        <h5 className="text-secondary">Entry Pad</h5>
        <form noValidate onSubmit={onSubmit}>
          <fieldset>
            <h5 className="text-secondary">Company Details</h5>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">
                Name:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="name"
                  className={`"form-control form-control-sm" ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  placeholder={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  aria-describedby="companyNameInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {nameError(errors)}
              </div>

              <label htmlFor="logo" className="col-sm-2 col-form-label col-form-label-sm">
                Logo:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="icon"
                  name="logo"
                  className={`"form-control form-control-sm" ${errors.logo ? "is-invalid" : ""}`}
                  id="logo"
                  placeholder={logo}
                  onChange={e => {
                    setLogo(e.target.value);
                  }}
                  aria-describedby="companyIconInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {logoError(errors)}
              </div>

              <label htmlFor="description" className="col-sm-2 col-form-label col-form-label-sm">
                Description:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="description"
                  className={`"form-control form-control-sm" ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  id="description"
                  placeholder={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  aria-describedby="companyDescriptionInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {descriptionError(errors)}
              </div>

              <label htmlFor="location" className="col-sm-2 col-form-label col-form-label-sm">
                Location:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="location"
                  className={`"form-control form-control-sm" ${
                    errors.location ? "is-invalid" : ""
                  }`}
                  id="location"
                  placeholder={location}
                  Location
                  onChange={e => {
                    setLocation(e.target.value);
                  }}
                  aria-describedby="locationInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {locationError(errors)}
              </div>

              <label htmlFor="country" className="col-sm-2 col-form-label col-form-label-sm">
                Country:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="country"
                  className={`"form-control form-control-sm" ${errors.country ? "is-invalid" : ""}`}
                  id="country"
                  placeholder={country}
                  onChange={e => {
                    setCountry(e.target.value);
                  }}
                  aria-describedby="countryInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {countryError(errors)}
              </div>
              <label htmlFor="established" className="col-sm-2 col-form-label col-form-label-sm">
                Established:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="decimal"
                  name="established"
                  className={`"form-control form-control-sm" ${
                    errors.established ? "is-invalid" : ""
                  }`}
                  id="established"
                  placeholder={established}
                  onChange={e => {
                    setEstablished(e.target.value);
                  }}
                  aria-describedby="establishedInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {establishedError(errors)}
                {messageError(message)}
              </div>
            </div>
            <span className="font-italic text-secondary">
              Click button to change company details
            </span>
            <div className="row">
              <EditBtn handleCancelClick={handleCancelClick} />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
CompanyEditForm.propTypes = {
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setLogo: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  setCountry: PropTypes.func.isRequired,
  setEstablished: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  established: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired
};
export default CompanyEditForm;
