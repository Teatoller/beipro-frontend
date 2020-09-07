import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import CommonAuthNav from "../common/CommonAuthNav";
import { ResetRequestForm } from "./ResetRequestForm";

export const ResetRequestView = props => {
  const { loading, onChange, onSubmit, inputs, errors } = props;
  return (
    <>
      <CommonAuthNav />
      <ResetRequestForm
        loading={loading}
        onChange={onChange}
        onSubmit={onSubmit}
        inputs={inputs}
        errors={errors}
      />
      <Footer />
    </>
  );
};
ResetRequestView.propTypes = {
  inputs: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf.isRequired,
  loading: PropTypes.bool.isRequired
};
export default ResetRequestView;
