import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import CommonAuthNav from "../common/CommonAuthNav";
import { RegisterForm } from "./RegisterForm";

export const RegisterView = props => {
  const {
    inputs,
    onChange,
    onSubmit,
    loading,
    errors,
    checkbox,
    handleAlert,
    setCheckbox,
    message
  } = props;
  return (
    <>
      <CommonAuthNav />
      <RegisterForm
        firstname={inputs}
        lastname={inputs}
        email={inputs}
        onChange={onChange}
        onSubmit={onSubmit}
        password={inputs}
        password_confirmation={inputs}
        loading={loading}
        errors={errors}
        message={message}
        checkbox={checkbox}
        handleAlert={handleAlert}
        setCheckbox={setCheckbox}
      />
      <Footer />
    </>
  );
};
RegisterView.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleAlert: PropTypes.func.isRequired,
  checkbox: PropTypes.bool.isRequired,
  setCheckbox: PropTypes.func.isRequired
};
export default RegisterView;
