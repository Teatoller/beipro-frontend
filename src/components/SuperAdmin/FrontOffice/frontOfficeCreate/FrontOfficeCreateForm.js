/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import Error from "../../../Error";
import { Spinner } from "../../../../spinner/Spinner";
import { CoLocation } from "../../../CompanyAdmin/common/CoLocation";
import { CoName } from "../../Company/common/CoName";
import CreateBtn from "../../common/CreateBtn";
import { FrontOfficeCreateSidebar } from "./FrontOfficeCreateSidebar";

export const FrontOfficeCreateForm = props => {
  const {
    loading,
    onSubmit,
    setCode,
    setCompany_Id,
    setName,
    setLocation,
    errors,
    currentItems,
    handleCancelClick
  } = props;

  return (
    <>
      <div className="row">
        <span>{loading ? <Spinner /> : null}</span>
        <div className="col-sm-6 m-auto">
          <h5 className="text-secondary">Entry Pad</h5>
          <form noValidate onSubmit={onSubmit}>
            <fieldset>
              <h6>Front Office Detail&apos;s</h6>
              <div className="form-group row">
                <label htmlFor="companyId" className="col-sm-2 col-form-label col-form-label-sm">
                  Company Id:
                </label>
                <div className="col-sm-10 mb-1">
                  <input
                    type="decimal"
                    name="company_id"
                    className="form-control form-control-sm"
                    id="companyId"
                    placeholder="Enter Company Id"
                    onChange={e => {
                      setCompany_Id(e.target.value);
                    }}
                    aria-describedby="companyIdInput"
                    aria-required="true"
                    aria-invalid="false"
                  />
                </div>

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

                <label htmlFor="code" className="col-sm-2 col-form-label col-form-label-sm">
                  Code:
                </label>
                <div className="col-sm-10 mb-1">
                  <input
                    type="text"
                    name="code"
                    className="form-control form-control-sm"
                    id="code"
                    placeholder="Enter front Office code"
                    onChange={e => {
                      setCode(e.target.value);
                    }}
                    aria-describedby="frontOfficeCodeInput"
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
                  <span className={`text-danger ${errors ? "is-invalid" : ""}`}>
                    <Error error={errors || null} />
                  </span>
                </div>
              </div>

              <div className="row">
                <CreateBtn handleCancelClick={handleCancelClick} />
              </div>
            </fieldset>
          </form>
        </div>
        <FrontOfficeCreateSidebar currentItems={currentItems} />
      </div>
    </>
  );
};
FrontOfficeCreateForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCompany_Id: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired
};
export default FrontOfficeCreateForm;
