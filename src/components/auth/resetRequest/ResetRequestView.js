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
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.bool.isRequired
};
export default ResetRequestView;
