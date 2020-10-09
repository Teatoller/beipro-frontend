/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../Nav";
import Footer from "../Footer";
import { Spinner } from "../../../spinner/Spinner";
import "../../css/site.css";
import { DepotMenu } from "./DepotMenu";
import { DepotTable } from "./DepotTable";
import { DepotPagination } from "./DepotPagination";
import { DepotUpArrow } from "./DepotUpArrow";

export const DepotView = props => {
  const {
    setActivePage,
    loading,
    handleChange,
    curTime,
    activePage,
    selectedLocation,
    selectedLocationItems,
    errors,
    message,
    itemCountPerPage
  } = props;

  return (
    <>
      <Nav />

      <div className="container">
        <div className="row" id="top">
          <div className="col-sm">
            <span>{loading ? <Spinner /> : null}</span>
            <DepotMenu handleChange={handleChange} />
            <DepotTable
              curTime={curTime}
              errors={errors}
              message={message}
              activePage={activePage}
              setActivePage={setActivePage}
              selectedLocation={selectedLocation}
              selectedLocationItems={selectedLocationItems}
              itemCountPerPage={itemCountPerPage}
            />
          </div>
        </div>
        <DepotPagination
          itemCountPerPage={itemCountPerPage}
          selectedLocationItems={selectedLocationItems}
          setActivePage={setActivePage}
        />
        <DepotUpArrow />
      </div>

      <Footer />
    </>
  );
};
DepotView.propTypes = {
  curTime: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf.isRequired,
  loading: PropTypes.bool.isRequired,
  activePage: PropTypes.number.isRequired,
  itemCountPerPage: PropTypes.number.isRequired,
  selectedLocationItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedLocation: PropTypes.string.isRequired,
  setActivePage: PropTypes.number.isRequired
};
export default DepotView;
