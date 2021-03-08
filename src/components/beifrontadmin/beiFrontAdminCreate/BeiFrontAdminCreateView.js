/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import { Spinner } from "../../../spinner/Spinner";
import UnAuthorized from "../../auth/common/UnAuthorized";
import { BeiFrontAdminCreateDisplay } from "./BeiFrontAdminCreateDisplay";
import { BeiFrontAdminCreateForm } from "./BeiFrontAdminCreateForm";

function BeiFrontAdminCreateView(props) {
  const {
    userRole,
    loading,
    company,
    location,
    currentPrice,
    errors,
    message,
    onSubmit,
    front_office_id,
    diesel,
    petrol,
    kerosene,
    fo,
    ido,
    lpg,
    handleCancelClick,
    setDiesel,
    setPetrol,
    setFo,
    setIdo,
    setKerosene,
    setLpg
  } = props;

  return (
    <>
      <Nav />
      {userRole ? (
        <>
          <div className="container" aria-label="Create current price form">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <BeiFrontAdminCreateForm
                company={company}
                location={location}
                currentPrice={currentPrice}
                errors={errors}
                message={message}
                onSubmit={onSubmit}
                front_office_id={front_office_id}
                diesel={diesel}
                petrol={petrol}
                kerosene={kerosene}
                fo={fo}
                ido={ido}
                lpg={lpg}
                handleCancelClick={handleCancelClick}
                setDiesel={setDiesel}
                setPetrol={setPetrol}
                setFo={setFo}
                setIdo={setIdo}
                setKerosene={setKerosene}
                setLpg={setLpg}
              />
              <BeiFrontAdminCreateDisplay currentPrice={currentPrice} />
            </div>
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}
      <Footer />
    </>
  );
}
BeiFrontAdminCreateView.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPrice: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  front_office_id: PropTypes.string.isRequired,
  diesel: PropTypes.string.isRequired,
  petrol: PropTypes.string.isRequired,
  kerosene: PropTypes.string.isRequired,
  fo: PropTypes.string.isRequired,
  ido: PropTypes.string.isRequired,
  lpg: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  setDiesel: PropTypes.func.isRequired,
  setPetrol: PropTypes.func.isRequired,
  setFo: PropTypes.func.isRequired,
  setIdo: PropTypes.func.isRequired,
  setKerosene: PropTypes.func.isRequired,
  setLpg: PropTypes.func.isRequired
};
export default BeiFrontAdminCreateView;
