/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../../Error";
import { CoName } from "../common/CoName";
import { CoLocation } from "../../../CompanyAdmin/common/CoLocation";
import CreateBtn from "../../common/CreateBtn";

export const CompanyCreateForm = props => {
  const {
    onSubmit,
    setName,
    setLogo,
    setDescription,
    setLocation,
    setCountry,
    setEstablished,
    errors,
    handleCancelClick
  } = props;

  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };

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
                <CoName
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <label htmlFor="logo" className="col-sm-2 col-form-label col-form-label-sm">
                Logo:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="icon"
                  name="logo"
                  className="form-control form-control-sm"
                  id="logo"
                  placeholder="Enter company Icon"
                  onChange={e => {
                    setLogo(e.target.value);
                  }}
                  aria-describedby="companyIconInput"
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>

              <label htmlFor="description" className="col-sm-2 col-form-label col-form-label-sm">
                Description:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="description"
                  className="form-control form-control-sm"
                  id="description"
                  placeholder="Enter Company Description"
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  aria-describedby="companyDescriptionInput"
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>

              <label htmlFor="location" className="col-sm-2 col-form-label col-form-label-sm">
                Location:
              </label>
              <div className="col-sm-10 mb-1">
                <CoLocation
                  onChange={e => {
                    setLocation(e.target.value);
                  }}
                />
              </div>

              <label htmlFor="country" className="col-sm-2 col-form-label col-form-label-sm">
                Country:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="country"
                  className="form-control form-control-sm"
                  id="country"
                  placeholder="Enter Country"
                  onChange={e => {
                    setCountry(e.target.value);
                  }}
                  aria-describedby="countryInput"
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>
              <label htmlFor="established" className="col-sm-2 col-form-label col-form-label-sm">
                Established:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="decimal"
                  name="established"
                  className="form-control form-control-sm"
                  id="established"
                  placeholder="Enter Year Established"
                  onChange={e => {
                    setEstablished(e.target.value);
                  }}
                  aria-describedby="establishedInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                <span style={errors ? dangerStyle : null}>
                  <Error error={errors || null} />
                </span>
              </div>
            </div>
            <span className="font-italic text-secondary">Click button to add a Company</span>
            <div className="row">
              <CreateBtn handleCancelClick={handleCancelClick} />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
CompanyCreateForm.propTypes = {
  errors: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setLogo: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  setCountry: PropTypes.func.isRequired,
  setEstablished: PropTypes.func.isRequired
};
export default CompanyCreateForm;
