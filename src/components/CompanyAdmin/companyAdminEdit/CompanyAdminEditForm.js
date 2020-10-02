/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import EditBtn from "../../SuperAdmin/common/EditBtn";
import { firstnameError } from "../../auth/common/firstnameError";
import { emailError } from "../../auth/common/emailError";
import { front_office_idError } from "../../frontAdmin/common/errors/front_office_id";
import { lastnameError } from "../../auth/common/lastnameError";
import { roleError } from "../../frontAdmin/common/errors/roleError";
import { staff_idError } from "../../frontAdmin/common/errors/staff_id";
import { locationError } from "../../frontAdmin/common/errors/locationError";
import { messageError } from "../../auth/common/messageError";
import { admin_idError } from "../../frontAdmin/common/errors/admin_idError";
import { company_idError } from "../../frontAdmin/common/errors/company_id";

export const CompanyAdminEditForm = props => {
  const {
    admin_id,
    company_id,
    front_office_id,
    staff_id,
    location,
    errors,
    message,
    handleCancelClick,
    onSubmit,
    firstname,
    lastname,
    role,
    email,
    setFirstname,
    setLastname,
    setEmail,
    setRole,
    setFront_Office_Id,
    setStaff_Id,
    setLocation
  } = props;

  return (
    <>
      <main>
        <form noValidate onSubmit={onSubmit}>
          <h1 className="h6">Front Admin Details</h1>
          <div className="form-group row">
            <label htmlFor="frontOfficeId" className="col-sm-2 col-form-label col-form-label-sm">
              Office Id:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="front_office_id"
                className={`form-control form-control-sm ${
                  errors.front_office_id ? "is-invalid" : ""
                }`}
                id="frontOfficeId"
                placeholder={front_office_id}
                onChange={e => {
                  setFront_Office_Id(e.target.value);
                }}
                aria-describedby="forntOfficeIdInput"
                readOnly
              />
              {front_office_idError(errors)}
            </div>

            <label htmlFor="lastName" className="col-sm-2 col-form-label col-form-label-sm">
              Firstname:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="text"
                name="firstname"
                className={`form-control form-control-sm ${errors.firstname ? "is-invalid" : ""}`}
                id="firstname"
                placeholder={firstname}
                onChange={e => {
                  setFirstname(e.target.value);
                }}
                aria-describedby="firstnameInput"
              />
              {firstnameError(errors)}
            </div>

            <label htmlFor="lastName" className="col-sm-2 col-form-label col-form-label-sm">
              Lastname:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="text"
                name="lastname"
                className={`form-control form-control-sm ${errors.lastname ? "is-invalid" : ""}`}
                id="lastname"
                placeholder={lastname}
                onChange={e => {
                  setLastname(e.target.value);
                }}
                aria-describedby="lastnameInput"
              />
              {lastnameError(errors)}
            </div>

            <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-sm">
              Email:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="email"
                name="email"
                className={`form-control form-control-sm ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                aria-describedby="emailInput"
              />
              {emailError(errors)}
            </div>

            <label htmlFor="role" className="col-sm-2 col-form-label col-form-label-sm">
              Role:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="text"
                name="role"
                className={`form-control form-control-sm ${errors.role ? "is-invalid" : ""}`}
                id="role"
                placeholder={role}
                onChange={e => {
                  setRole(e.target.value);
                }}
                aria-describedby="roleInput"
                readOnly
              />
              {roleError(errors)}
            </div>

            <label htmlFor="staffId" className="col-sm-2 col-form-label col-form-label-sm">
              Staff Id:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="text"
                name="staff_id"
                className={`form-control form-control-sm ${errors.staff_id ? "is-invalid" : ""}`}
                id="staffId"
                placeholder={staff_id}
                onChange={e => {
                  setStaff_Id(e.target.value);
                }}
                aria-describedby="staffIdInput"
              />
              {staff_idError(errors)}
            </div>

            <label htmlFor="location" className="col-sm-2 col-form-label col-form-label-sm">
              Location:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="text"
                name="location"
                className={`form-control form-control-sm ${errors.location ? "is-invalid" : ""}`}
                id="location"
                placeholder={location}
                onChange={e => {
                  setLocation(e.target.value);
                }}
                aria-describedby="locationInput"
              />
              {locationError(errors)}
              {messageError(message)}
            </div>
          </div>
          <div className="row">
            <EditBtn handleCancelClick={handleCancelClick} />
          </div>
          <fieldset disabled className="hide invisible">
            <div className="form-group row">
              <label htmlFor="adminId" className="col-sm-2 col-form-label col-form-label-sm">
                admin_id:
              </label>
              <div className="col-sm-10">
                <input
                  type="decimal"
                  name="admin_id"
                  id="adminId"
                  className={`form-control form-control-sm ${errors.admin_id ? "is-invalid" : ""}`}
                  placeholder="Disabled input"
                  value={admin_id}
                  aria-describedby="adminIdInput"
                />
                {admin_idError(errors)}
              </div>
            </div>
            <hr />
            <div className="form-group row">
              <label htmlFor="companyId" className="col-sm-2 col-form-label col-form-label-sm">
                company_id:
              </label>
              <div className="col-sm-10">
                <input
                  type="decimal"
                  name="company_id"
                  id="companyId"
                  className={`form-control form-control-sm ${
                    errors.company_id ? "is-invalid" : ""
                  }`}
                  placeholder="Disabled input"
                  value={company_id}
                  aria-describedby="companyIdInput"
                />
                {company_idError(errors)}
              </div>
            </div>
          </fieldset>
        </form>
      </main>
    </>
  );
};
CompanyAdminEditForm.propTypes = {
  location: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  front_office_id: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  admin_id: PropTypes.string.isRequired,
  company_id: PropTypes.string.isRequired,
  staff_id: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setLastname: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setStaff_Id: PropTypes.func.isRequired,
  setFront_Office_Id: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired
};
export default CompanyAdminEditForm;
