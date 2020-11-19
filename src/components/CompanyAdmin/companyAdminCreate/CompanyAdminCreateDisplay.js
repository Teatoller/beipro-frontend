/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import { Spinner } from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import UnAuthorized from "../../auth/common/UnAuthorized";
import { CompanyAdminCreateForm } from "./CompanyAdminCreateForm";

export const CompanyAdminCreateDisplay = props => {
  const {
    userRole,
    loading,
    company,
    admin_id,
    company_id,
    errors,
    message,
    handleCancelClick,
    onSubmit,
    setFirstname,
    setEmail,
    setLastname,
    setRole,
    setStaff_Id,
    setLocation,
    currentItems,
    itemCountPerPage,
    companyStaff,
    setActivePage,
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

  const paginate = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <>
      {userRole ? (
        <>
          <div className="container" aria-label="Create company front admin form">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <CompanyAdminCreateForm
                userRole={userRole}
                loading={loading}
                company={company}
                admin_id={admin_id}
                company_id={company_id}
                errors={errors}
                message={message}
                handleCancelClick={handleCancelClick}
                onSubmit={onSubmit}
                setFirstname={setFirstname}
                setEmail={setEmail}
                setLastname={setLastname}
                setRole={setRole}
                setStaff_Id={setStaff_Id}
                setLocation={setLocation}
                currentItems={currentItems}
                itemCountPerPage={itemCountPerPage}
                companyStaff={companyStaff}
                setActivePage={setActivePage}
                input={input}
                f1={f1}
                f1Loc={f1Loc}
                f2={f2}
                f2Loc={f2Loc}
                f3={f3}
                f3Loc={f3Loc}
                f4={f4}
                f4Loc={f4Loc}
                f5={f5}
                f5Loc={f5Loc}
              />
              <div className="col-sm-6 mx-auto">
                <h5 className="text-secondary">Staff details</h5>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Office-id</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Staff_id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Location</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="fixed-bottom mb-3">
              <Pagination
                itemCountPerPage={itemCountPerPage}
                totalItems={companyStaff.length}
                paginate={paginate}
              />
            </div>
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}
      <Footer />
    </>
  );
};
CompanyAdminCreateDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  admin_id: PropTypes.string.isRequired,
  company_id: PropTypes.string.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setLastname: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setStaff_Id: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  companyStaff: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
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
export default CompanyAdminCreateDisplay;
