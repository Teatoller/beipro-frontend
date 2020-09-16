/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../../Landing/Footer";
import { Spinner } from "../../../../spinner/Spinner";
import NewValue from "../NewValue";
import UnAuthorized from "../../../auth/common/UnAuthorized";

export const AuditViewDisplay = props => {
  const {
    userRole,
    loading,
    id,
    user_id,
    user_type,
    event,
    auditable_id,
    auditable_type,
    old_values,
    new_values,
    url,
    ip_address,
    user_agent,
    tags,
    created_at,
    updated_at,
    handleCancelClick
  } = props;

  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };
  return (
    <>
      {userRole ? (
        <>
          <div className="container" aria-label="Create company front admin form">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>

              <div className="col-sm">
                <h5 className="text-secondary">Audit Item</h5>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <tbody>
                      <tr>
                        <td className="auditview">id</td>
                        <td className="auditview">{id}</td>
                      </tr>
                      <tr>
                        <td className="auditview">User Type</td>
                        <td className="auditview">{user_type}</td>
                      </tr>
                      <tr>
                        <td className="auditview">User Id</td>
                        <td className="auditview">{user_id}</td>
                      </tr>
                      <tr>
                        <td className="auditview">Event</td>
                        <td className="auditview">{event}</td>
                      </tr>
                      <tr>
                        <td className="auditview">Auditable Type</td>
                        <td className="auditview">{auditable_type}</td>
                      </tr>
                      <tr>
                        <td className="auditview">Auditable_Id</td>
                        <td className="auditview">{auditable_id}</td>
                      </tr>
                      <tr>
                        <td className="auditview">old_values</td>
                        <td className="auditview">{old_values}</td>
                      </tr>
                      <tr>
                        <td className="auditview">new_values</td>
                        {/* <td className="auditview"><NewValue newvalue={new_values} /></td> */}
                        <td className="auditview">
                          <span style={new_values ? dangerStyle : null}>
                            <NewValue newvalue={new_values ? "Happy??" : null} />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="auditview">url</td>
                        <td className="auditview">{url}</td>
                      </tr>
                      <tr>
                        <td className="auditview">ip_address</td>
                        <td className="admin">{ip_address}</td>
                      </tr>
                      <tr>
                        <td className="auditview">user_agent</td>
                        <td className="admin">{user_agent}</td>
                      </tr>
                      <tr>
                        <td className="auditview">tags</td>
                        <td className="admin">{tags}</td>
                      </tr>
                      <tr>
                        <td className="auditview">created_at</td>
                        <td className="admin">{created_at}</td>
                      </tr>
                      <tr>
                        <td className="auditview">updated_at</td>
                        <td className="auditview">{updated_at}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-outline-info"
                onClick={handleCancelClick}
              >
                Back
              </button>
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
AuditViewDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  user_type: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  auditable_id: PropTypes.string.isRequired,
  auditable_type: PropTypes.string.isRequired,
  old_values: PropTypes.string.isRequired,
  new_values: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  ip_address: PropTypes.string.isRequired,
  user_agent: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default AuditViewDisplay;
