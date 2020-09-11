/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../spinner/Spinner";
import UnAuthorized from "../auth/common/UnAuthorized";
import Error from "../Error";

export const FrontAdminDisplay = props => {
  const { userRole, loading, company, location, currentPrice, errors, handleCreateClick } = props;

  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };
  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h5 className="text-secondary">
                  Current Price: {company}-{location}
                </h5>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Front-office-id</th>
                        <th scope="col">Diesel</th>
                        <th scope="col">Petrol</th>
                        <th scope="col">Kerosene</th>
                        <th scope="col">Ido</th>
                        <th scope="col">Fuel Oil</th>
                        <th scope="col">Lpg</th>
                        <th scope="col">Action</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>{currentPrice}</tbody>
                  </table>
                  <span style={errors ? dangerStyle : null}>
                    <Error error={errors || null} />
                  </span>
                </div>
              </div>
            </div>
            <span className="font-italic form-text text-muted">
              Click button to add a new current price
            </span>
            <div className="col-1-sm m-2">
              <button className="btn btn-sm btn-success" type="submit" onClick={handleCreateClick}>
                Add
              </button>
            </div>
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}
    </>
  );
};
FrontAdminDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCreateClick: PropTypes.func.isRequired,
  currentPrice: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  errors: PropTypes.bool.isRequired
};
export default FrontAdminDisplay;
