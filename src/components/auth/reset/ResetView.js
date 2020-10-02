import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";

import CommonAuthNav from "../common/CommonAuthNav";
import { ResetForm } from "./ResetForm";
import { ResetSidebar } from "./ResetSidebar";

export const ResetView = props => {
  const { loading, onSubmit, onChange, inputs, errors, message } = props;
  return (
    <>
      <CommonAuthNav />
      <div className="container" aria-label="Password Reset form">
        <div className="row">
          <ResetForm
            loading={loading}
            onSubmit={onSubmit}
            onChange={onChange}
            inputs={inputs}
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
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default ResetView;
