/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";

import CommonAuthNav from "../common/CommonAuthNav";
import { ResetForm } from "./ResetForm";
import { ResetSidebar } from "./ResetSidebar";

export const ResetView = props => {
  const {
    loading,
    onSubmit,
    errors,
    message,
    setEmail,
    setPassword,
    setPassword_Confirmation,
    setToken
  } = props;
  return (
    <>
      <CommonAuthNav />
      <div className="container" aria-label="Password Reset form">
        <div className="row">
          <ResetForm
            loading={loading}
            onSubmit={onSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
            setPassword_Confirmation={setPassword_Confirmation}
            setToken={setToken}
            errors={errors}
            message={message}
          />
          <ResetSidebar />
        </div>
      </div>
      <Footer />
    </>
  );
};
ResetView.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default ResetView;
