/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import { Spinner } from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import UnAuthorized from "../../auth/common/UnAuthorized";
import { CompanyAdminEditDisplay } from "./CompanyAdminEditDisplay";
import { CompanyAdminEditForm } from "./CompanyAdminEditForm";

export const CompanyAdminEditView = props => {
  const {
    userRole,
    loading,
    company,
    admin_id,
    front_office_id,
    staff_id,
    location,
    errors,
    handleCancelClick,
    firstname,
    lastname,
    role,
    onSubmit,
    email,
    setFirstname,
    setEmail,
    setLastname,
    setRole,
    setStaff_Id,
    setFront_Office_Id,
    setLocation,
    currentItems,
    itemCountPerPage,
    companyStaff,
    setActivePage
  } = props;

  const paginate = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <Nav />
      {userRole ? (
        <>
          <div className="container">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm-6 m-auto">
                <h5 className="text-secondary">{company}:Edit Entry Pad</h5>
                <CompanyAdminEditForm
                  admin_id={admin_id}
                  front_office_id={front_office_id}
                  staff_id={staff_id}
                  location={location}
                  errors={errors}
                  onSubmit={onSubmit}
                  handleCancelClick={handleCancelClick}
                  firstname={firstname}
                  lastname={lastname}
                  role={role}
                  email={email}
                  setFirstname={setFirstname}
                  setLastname={setLastname}
                  setEmail={setEmail}
                  setRole={setRole}
                  setStaff_Id={setStaff_Id}
                  setFront_Office_Id={setFront_Office_Id}
                  setLocation={setLocation}
                />
              </div>
              <CompanyAdminEditDisplay currentItems={currentItems} />
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
CompanyAdminEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  front_office_id: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  admin_id: PropTypes.string.isRequired,
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
  setLocation: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  companyStaff: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default CompanyAdminEditView;
