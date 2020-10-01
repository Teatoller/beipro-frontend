/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import Footer from "../../../Landing/Footer";
import { Spinner } from "../../../../spinner/Spinner";
import Pagination from "../../../Pagination";
import UnAuthorized from "../../../auth/common/UnAuthorized";
import { CompanyEditDisplay } from "./CompanyEditDisplay";
import { CompanyEditForm } from "./CompanyEditForm";

export const CompanyEditView = props => {
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
    company,
    name,
    logo,
    established,
    description,
    location,
    country
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
              <CompanyEditForm
                onSubmit={onSubmit}
                name={name}
                logo={logo}
                country={country}
                established={established}
                description={description}
                location={location}
                errors={errors}
                handleCancelClick={handleCancelClick}
                setName={setName}
                setLocation={setLocation}
                setDescription={setDescription}
                setEstablished={setEstablished}
                setCountry={setCountry}
                setLogo={setLogo}
              />
              <CompanyEditDisplay currentItems={currentItems} />
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
CompanyEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
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
  setActivePage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  established: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired
};
export default CompanyEditView;
