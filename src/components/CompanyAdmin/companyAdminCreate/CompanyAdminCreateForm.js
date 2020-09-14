/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../Error";
import { CoLocation } from "../common/CoLocation";
import { CoAdminRole } from "../common/CoAdminRole";
import CreateBtn from "../../SuperAdmin/common/CreateBtn";

export const CompanyAdminCreateForm = props => {
  const {
    company,
    admin_id,
    errors,
    handleCancelClick,
    onSubmit,
    setFirstname,
    setEmail,
    setLastname,
    setRole,
    setStaff_Id,
    setLocation,
    input,
    f1,
    f1Loc,
    f2,
    f2Loc,
    f3,
    f3Loc,
    f4,
    f4Loc,
    f5,
    f5Loc
  } = props;

  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };

  return (
    <>
      <div className="col-sm-6 m-auto">
        <h5 className="text-secondary">{company}:Entry Pad</h5>
        <main>
          <form noValidate onSubmit={onSubmit}>
            <fieldset disabled className="hide invisible">
              <div className="form-group row">
                <label htmlFor="adminId" className="col-sm-2 col-form-label col-form-label-sm">
                  Admin:
                </label>
                <div className="col-sm-10 mb-1">
                  <input
                    type="decimal"
                    name="admin_id"
                    id="adminId"
                    className="form-control"
                    placeholder="Disabled input"
                    value={admin_id}
                    aria-describedby="adminIdInput"
                  />
                </div>
              </div>
            </fieldset>
            <h6>Front Admin Details</h6>
            <div className="form-group row">
              <label htmlFor="frontOfficeId" className="col-sm-2 col-form-label col-form-label-sm">
                Office-Id:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="decimal"
                  name="front_office_id"
                  className="form-control form-control-sm"
                  id="frontOfficeId"
                  placeholder="Enter Front-office-id"
                  aria-describedby="frontOfficeIdInput"
                  aria-required="true"
                  aria-invalid="false"
                  ref={input}
                />
                <span className="col-sm-2 col-form-label col-form-label-sm">
                  <i className="font-italic text-success">
                    id &apos;s: {f1}-{f1Loc},{f2}-{f2Loc},{f3}-{f3Loc},{f4}-{f4Loc},{f5}-{f5Loc}
                  </i>
                </span>
              </div>

              <label htmlFor="lastName" className="col-sm-2 col-form-label col-form-label-sm">
                Firstname:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="firstname"
                  className="form-control form-control-sm"
                  id="firstname"
                  placeholder="Enter Front-admin Firstname"
                  onChange={e => {
                    setFirstname(e.target.value);
                  }}
                  aria-describedby="firstnameInput"
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>

              <label htmlFor="lastName" className="col-sm-2 col-form-label col-form-label-sm">
                Lastname:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="lastname"
                  className="form-control form-control-sm"
                  id="lastname"
                  placeholder="Enter Front-admin Lastname"
                  onChange={e => {
                    setLastname(e.target.value);
                  }}
                  aria-describedby="lastnameInput"
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>

              <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-sm">
                Email:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-sm"
                  id="email"
                  placeholder="Enter Front-admin Email"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  aria-describedby="emailInput"
                  aria-required="true"
                  aria-invalid="false"
                />
              </div>

              <label htmlFor="role" className="col-sm-2 col-form-label col-form-label-sm">
                Role:
              </label>
              <div className="col-sm-10 mb-1">
                <CoAdminRole
                  onChange={e => {
                    setRole(e.target.value);
                  }}
                />
              </div>

              <label htmlFor="staffId" className="col-sm-2 col-form-label col-form-label-sm">
                Staff Id:
              </label>
              <div className="col-sm-10 mb-1">
                <input
                  type="text"
                  name="staff_id"
                  className="form-control form-control-sm"
                  id="staffId"
                  placeholder="Enter Staff Id"
                  onChange={e => {
                    setStaff_Id(e.target.value);
                  }}
                  aria-describedby="staffIdInput"
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
                <span style={errors ? dangerStyle : null}>
                  <Error error={errors || null} />
                </span>
              </div>
            </div>
            <div className="row">
              <CreateBtn handleCancelClick={handleCancelClick} />
            </div>
          </form>
        </main>
      </div>
    </>
  );
};
CompanyAdminCreateForm.propTypes = {
  company: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  admin_id: PropTypes.string.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setLastname: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setStaff_Id: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  f1: PropTypes.number.isRequired,
  f1Loc: PropTypes.string.isRequired,
  f2: PropTypes.number.isRequired,
  f2Loc: PropTypes.string.isRequired,
  f3: PropTypes.number.isRequired,
  f3Loc: PropTypes.string.isRequired,
  f4: PropTypes.number.isRequired,
  f4Loc: PropTypes.string.isRequired,
  f5: PropTypes.number.isRequired,
  f5Loc: PropTypes.string.isRequired
};
export default CompanyAdminCreateForm;
