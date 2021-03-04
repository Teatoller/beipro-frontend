/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../spinner/Spinner";
import UnAuthorized from "../auth/common/UnAuthorized";
import { NrbGraphs } from "../illustrations/NrbGraphs";
import { MsaGraphs } from "../illustrations/MsaGraphs";
import { KsmGraphs } from "../illustrations/KsmGraphs";
import { NkrGraphs } from "../illustrations/NkrGraphs";
import { EldGraphs } from "../illustrations/EldGraphs";
import { messageError } from "../auth/common/messageError";

export const BeiFrontAdminDisplay = props => {
  const {
    userRole,
    loading,
    company,
    location,
    currentPrice,
    message,
    loggedStaffLocation
  } = props;

  return (
    <>
      {userRole ? (
        <>
          <div className="container">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm">
                <h1 className="text-secondary h6">
                  Current Prices: {company}-{location}
                </h1>
                <div className="table-responsive">
                  <table className="table table-sm table-md table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Company</th>
                        <th scope="col">Diesel</th>
                        <th scope="col">Petrol</th>
                        <th scope="col">Kero</th>
                        <th scope="col">Ido</th>
                        <th scope="col">Fo</th>
                        <th scope="col">Lpg</th>
                        <th scope="col">Action</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>{currentPrice}</tbody>
                  </table>
                  {messageError(message)}
                </div>
              </div>
            </div>
            {/* <div className="col-1-sm">
              <button className="btn btn-sm btn-success" type="submit" onClick={handleCreateClick}>
                Create
              </button>
            </div> */}
            <div>
              <div className="container">
                <div className="row">
                  {loggedStaffLocation === "Nairobi" ? (
                    <div className="col-sm">
                      <NrbGraphs />
                    </div>
                  ) : (
                    ""
                  )}
                  {loggedStaffLocation === "Mombasa" ? (
                    <div className="col-sm">
                      <MsaGraphs />
                    </div>
                  ) : (
                    ""
                  )}
                  {loggedStaffLocation === "Kisumu" ? (
                    <div className="col-sm">
                      <KsmGraphs />
                    </div>
                  ) : (
                    ""
                  )}
                  {loggedStaffLocation === "Nakuru" ? (
                    <div className="col-sm">
                      <NkrGraphs />
                    </div>
                  ) : (
                    ""
                  )}
                  {loggedStaffLocation === "Eldoret" ? (
                    <div className="col-sm">
                      <EldGraphs />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}
    </>
  );
};
BeiFrontAdminDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPrice: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};
export default BeiFrontAdminDisplay;
