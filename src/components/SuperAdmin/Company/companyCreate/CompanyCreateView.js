/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import Footer from "../../../Landing/Footer";
import { Spinner } from "../../../../spinner/Spinner";
import Pagination from "../../../Pagination";
import UnAuthorized from "../../../auth/common/UnAuthorized";
import { CompanyCreateDisplay } from "./CompanyCreateDisplay";
import { CompanyCreateForm } from "./CompanyCreateForm";

export const CompanyCreateView = props => {
  const {
    setActivePage,
    userRole,
    loading,
    onSubmit,
    setName,
    setLogo,
    setDescription,
    setLocation,
    setCountry,
    setEstablished,
    errors,
    handleCancelClick,
    itemCountPerPage,
    currentItems,
    company
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
              <CompanyCreateForm
                onSubmit={onSubmit}
                setName={setName}
                setLogo={setLogo}
                setDescription={setDescription}
                setLocation={setLocation}
                setCountry={setCountry}
                setEstablished={setEstablished}
                errors={errors}
                handleCancelClick={handleCancelClick}
              />
              <CompanyCreateDisplay currentItems={currentItems} />
            </div>
            <Pagination
              itemCountPerPage={itemCountPerPage}
              totalItems={company.length}
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
CompanyCreateView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setLogo: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  setCountry: PropTypes.func.isRequired,
  setEstablished: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default CompanyCreateView;
