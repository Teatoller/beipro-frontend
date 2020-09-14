/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import Footer from "../../../Landing/Footer";

import { Spinner } from "../../../../spinner/Spinner";
import Pagination from "../../../Pagination";
import UnAuthorized from "../../../auth/common/UnAuthorized";

import { FrontOfficeEditDisplay } from "./FrontOfficeEditDisplay";
import { FrontOfficeEditForm } from "./FrontOfficeEditForm";

export const FrontOfficeEditView = props => {
  const {
    setActivePage,
    userRole,
    loading,
    onSubmit,
    company_id,
    setCompany_Id,
    code,
    setCode,
    name,
    setName,
    location,
    setLocation,
    errors,
    handleCancelClick,
    currentItems,
    frontOffice,
    itemCountPerPage
  } = props;

  // Change page

  const paginate = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <Nav />
      {userRole ? (
        <>
          <div className="container" aria-label="Create company front admin form">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <FrontOfficeEditForm
                onSubmit={onSubmit}
                company_id={company_id}
                setCompany_Id={setCompany_Id}
                name={name}
                setName={setName}
                code={code}
                setCode={setCode}
                location={location}
                setLocation={setLocation}
                errors={errors}
                handleCancelClick={handleCancelClick}
              />
              <FrontOfficeEditDisplay currentItems={currentItems} />
            </div>
            <Pagination
              itemCountPerPage={itemCountPerPage}
              totalItems={frontOffice.length}
              paginate={paginate}
            />
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}

      <Footer />
    </>
  );
};
FrontOfficeEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  userRole: PropTypes.bool.isRequired,
  frontOffice: PropTypes.string.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  company_id: PropTypes.number.isRequired,
  setCompany_Id: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  errors: PropTypes.bool.isRequired
};
export default FrontOfficeEditView;
