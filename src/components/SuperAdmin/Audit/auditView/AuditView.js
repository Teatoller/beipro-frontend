/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import { Nav } from "../../../Landing/Nav";

import ConstSAdmin from "../../ConstSAdmin";
import BearerToken from "../../../../services/BearerToken";
import { AuditViewDisplay } from "./AuditViewDisplay";

export const AuditView = props => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState([]);
  const [user_type, setUser_Type] = useState([]);
  const [user_id, setUser_Id] = useState([]);
  const [event, setEvent] = useState([]);
  const [auditable_type, setAuditable_Type] = useState([]);
  const [auditable_id, setAuditable_Id] = useState([]);
  const [old_values, setOld_Values] = useState([]);
  const [new_values, setNew_Values] = useState([]);
  const [url, setUrl] = useState([]);
  const [ip_address, setIp_Address] = useState([]);
  const [user_agent, setUser_Agent] = useState([]);
  const [tags, setTags] = useState([]);
  const [created_at, setCreated_At] = useState([]);
  const [updated_at, setUpdated_At] = useState([]);

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/audit");
    setLoading(false);
  };

  const getAuditData = () => {
    const config = BearerToken();

    const sauditid = localStorage.getItem("auditid");
    axios.get(`/audits/${sauditid}`, config).then(response => {
      const auditData = response.data;

      const auditObj = auditData[0];

      setId(auditObj.id);
      setUser_Type(auditObj.user_type);
      setUser_Id(auditObj.user_id);
      setEvent(auditObj.event);
      setAuditable_Id(auditObj.auditable_id);
      setAuditable_Type(auditObj.auditable_type);
      setOld_Values(auditObj.old_values);
      setNew_Values(auditObj.new_values);
      setUrl(auditObj.url);
      setIp_Address(auditObj.ip_address);
      setUser_Agent(auditObj.user_agent);
      setTags(auditObj.tags);
      setCreated_At(auditObj.created_at);
      setUpdated_At(auditObj.updated_at);
      setLoading(false);
    });
  };

  useEffect(() => {
    setTimeout(() => getAuditData(), 500);
  }, []);

  const userRole = ConstSAdmin();

  return (
    <>
      <Nav />
      <AuditViewDisplay
        userRole={userRole}
        loading={loading}
        id={id}
        user_id={user_id}
        user_type={user_type}
        event={event}
        auditable_id={auditable_id}
        auditable_type={auditable_type}
        old_values={old_values}
        new_values={new_values}
        url={url}
        ip_address={ip_address}
        user_agent={user_agent}
        tags={tags}
        created_at={created_at}
        updated_at={updated_at}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
AuditView.propTypes = {
  history: PropTypes.shape().isRequired
};
export default AuditView;
