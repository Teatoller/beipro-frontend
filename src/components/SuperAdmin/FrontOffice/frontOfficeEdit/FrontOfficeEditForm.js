/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import EditBtn from "../../common/EditBtn";
import { locationError } from "../../../frontAdmin/common/errors/locationError";
import { messageError } from "../../../auth/common/messageError";
import { codeError } from "../../../frontAdmin/common/errors/codeError";
import { nameError } from "../../../frontAdmin/common/errors/nameError";
import { company_idError } from "../../../frontAdmin/common/errors/company_id";

export const FrontOfficeEditForm = props => {
  const {
    onSubmit,
    company_id,
    setCompany_Id,
    name,
    setName,
    code,
    setCode,
    location,
    setLocation,
    errors,
    message,
    handleCancelClick
  } = props;

  return (
    <>
      <div className="col-sm-6 m-auto">
        <h5 className="text-secondary">Entry Pad</h5>
        <form noValidate onSubmit={onSubmit}>
          <fieldset>
            <h6>Front Office Detail&apos;s</h6>
            <div className="form-group row">
              <label htmlFor="companyId" className="col-sm-2 col-form-label-sm">
                Company Id:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="decimal"
                  name="company_id"
                  className={`"form-control form-control-sm" ${
                    errors.company_id ? "is-invalid" : ""
                  }`}
                  id="companyId"
                  placeholder={company_id}
                  onChange={e => {
                    setCompany_Id(e.target.value);
                  }}
                  aria-describedby="companyIdInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {company_idError(errors)}
              </div>

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
                  aria-describedby="frontOfficeNameInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {nameError(errors)}
              </div>

              <label htmlFor="code" className="col-sm-2 col-form-label col-form-label-sm">
                Code:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="code"
                  className={`"form-control form-control-sm" ${errors.code ? "is-invalid" : ""}`}
                  id="code"
                  placeholder={code}
                  onChange={e => {
                    setCode(e.target.value);
                  }}
                  aria-describedby="frontOfficeCodeInput"
                  aria-required="true"
                  aria-invalid="false"
                />
                {codeError(errors)}
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
                {messageError(message)}
              </div>
            </div>

            <div className="row">
              <EditBtn handleCancelClick={handleCancelClick} />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
FrontOfficeEditForm.propTypes = {
  handleCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  company_id: PropTypes.number.isRequired,
  setCompany_Id: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default FrontOfficeEditForm;
