/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../../Error";
import { AdminRole } from "../common/AdminRole";
import CreateBtn from "../../common/CreateBtn";

export const AdminCreateForm = props => {
  const {
    onSubmit,
    setCompany_Id,
    setFirstname,
    setLastname,
    setEmail,
    setRole,
    setStaff_Id,
    errors,
    handleCancelClick
  } = props;

  return (
    <>
      <div className="col-sm-6 m-auto">
        <h5 className="text-secondary">Entry Pad</h5>
        <form noValidate onSubmit={onSubmit}>
          <h5 className="text-secondary">Admin Details</h5>
          <div className="form-group row">
            <label htmlFor="frontOfficeId" className="col-sm-2 col-form-label col-form-label-sm">
              Company Id:
            </label>
            <div className="col-sm-10 mb-1">
              <input
                type="decimal"
                name="company_id"
                className="form-control form-control-sm"
                id="companyId"
                placeholder="Enter Company-id"
                onChange={e => {
                  setCompany_Id(e.target.value);
                }}
                aria-describedby="companyIdInput"
                aria-required="true"
                aria-invalid="false"
              />
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
              <AdminRole
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
              <span className={`text-danger ${errors ? "is-invalid" : ""}`}>
                <Error error={errors || null} />
              </span>
            </div>
          </div>
          <div className="row">
            <CreateBtn handleCancelClick={handleCancelClick} />
          </div>
        </form>
      </div>
    </>
  );
};
AdminCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setCompany_Id: PropTypes.func.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setLastname: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setStaff_Id: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired
};
export default AdminCreateForm;
