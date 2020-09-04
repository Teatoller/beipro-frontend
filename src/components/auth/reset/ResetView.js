import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";

import CommonAuthNav from "../common/CommonAuthNav";
import { ResetForm } from "./ResetForm";
import { ResetSidebar } from "./ResetSidebar";

export const ResetView = props => {
  const { loading, onSubmit, onChange, inputs, errors } = props;
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
          />
          <ResetSidebar />
        </div>
      </div>
      <Footer />
    </>
  );
};
ResetView.propTypes = {
  inputs: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf.isRequired,
  loading: PropTypes.bool.isRequired
};
export default ResetView;
