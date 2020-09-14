/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import Footer from "../../../Landing/Footer";
import Pagination from "../../../Pagination";
import UnAuthorized from "../../../auth/common/UnAuthorized";
import { FrontOfficeCreateForm } from "./FrontOfficeCreateForm";

export const FrontOfficeCreateView = props => {
  const {
    userRole,
    loading,
    onSubmit,
    setCompany_Id,
    setCode,
    setName,
    setLocation,
    errors,
    handleCancelClick,
    currentItems,
    setActivePage,
    itemCountPerPage,
    frontOffice
  } = props;

  // Change page

  const paginate = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <Nav />
      {userRole ? <></> : <UnAuthorized />}
      <div className="container" aria-label="Create company front admin form">
        <FrontOfficeCreateForm
          loading={loading}
          onSubmit={onSubmit}
          setCode={setCode}
          setCompany_Id={setCompany_Id}
          setName={setName}
          setLocation={setLocation}
          errors={errors}
          currentItems={currentItems}
          handleCancelClick={handleCancelClick}
        />
        <Pagination
          itemCountPerPage={itemCountPerPage}
          totalItems={frontOffice.length}
          paginate={paginate}
        />
      </div>
      <Footer />
    </>
  );
};
FrontOfficeCreateView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  errors: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setCompany_Id: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
  frontOffice: PropTypes.string.isRequired
};
export default FrontOfficeCreateView;
