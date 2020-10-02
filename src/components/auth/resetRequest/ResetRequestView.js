import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import CommonAuthNav from "../common/CommonAuthNav";
import { ResetRequestForm } from "./ResetRequestForm";

export const ResetRequestView = props => {
  const { loading, onChange, onSubmit, inputs, errors, message } = props;
  return (
    <>
      <CommonAuthNav />
      <ResetRequestForm
        loading={loading}
        onChange={onChange}
        onSubmit={onSubmit}
        inputs={inputs}
        errors={errors}
        message={message}
      />
      <Footer />
    </>
  );
};
ResetRequestView.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default ResetRequestView;
