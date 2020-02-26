/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import NewValue from "./NewValue";

class AuditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: "",
      user_type: "",
      user_id: "",
      event: "",
      auditable_type: "",
      auditable_id: "",
      old_values: [],
      new_values: {},
      url: "",
      ip_address: "",
      user_agent: "",
      tags: "",
      created_at: "",
      updated_at: "",
      errors: {
        id: "",
        user_type: "",
        user_id: "",
        event: "",
        auditable_type: "",
        auditable_id: "",
        old_values: [],
        new_values: "",
        url: "",
        ip_address: "",
        user_agent: "",
        tags: "",
        created_at: "",
        updated_at: ""
      }
    };
  }

  componentDidMount() {
    this.auditData = setTimeout(() => this.getAuditData(), 500);
  }

  componentWillUnmount() {
    clearTimeout(this.auditData);
  }

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/audit");
    this.setState({ loading: false });
  };

  getAuditData = () => {
    const sauditid = localStorage.getItem("auditid");
    axios.get(`/audits/${sauditid}`, {}).then(response => {
      const auditData = response.data;

      const auditObj = auditData[0];

      this.setState({
        id: auditObj.id,
        user_type: auditObj.user_type,
        user_id: auditObj.user_id,
        event: auditObj.event,
        auditable_type: auditObj.auditable_type,
        auditable_id: auditObj.auditable_id,
        old_values: auditObj.old_values,
        new_values: auditObj.new_values,
        url: auditObj.url,
        ip_address: auditObj.ip_address,
        user_agent: auditObj.user_agent,
        tags: auditObj.tags,
        created_at: auditObj.created_at,
        updated_at: auditObj.updated_at,
        loading: false
      });
    });
  };

  render() {
    const {
      loading,
      errors,
      id,
      user_type,
      user_id,
      event,
      auditable_type,
      auditable_id,
      old_values,
      new_values,
      url,
      ip_address,
      user_agent,
      tags,
      created_at,
      updated_at
    } = this.state;

    const dangerStyle = {
      fontStyle: "italic",
      color: "red"
    };

    return (
      <div>
        <Nav />

        <div className="container" aria-label="Create company front admin form">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>

            <div className="col-sm">
              <h6>Audit Item</h6>
              <table className="table table-striped">
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
          <div>
            <button
              type="button"
              className="btn btn-sm btn-outline-info"
              onClick={this.handleCancelClick}
            >
              Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
AuditView.propTypes = {
  history: PropTypes.shape().isRequired
};
export default AuditView;
