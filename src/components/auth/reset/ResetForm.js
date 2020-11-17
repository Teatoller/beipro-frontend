/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../../spinner/Spinner";
import { ResetExtra } from "./ResetExtra";
import { ResetTextInput } from "./ResetTextInput";

export const ResetForm = props => {
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
      <div className="col-6 m-auto">
        <span>{loading ? <Spinner /> : null}</span>
        <header className="text-center">
          <p className="text-secondary">Please enter details to reset password</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <ResetTextInput
              setEmail={setEmail}
              setPassword={setPassword}
              setPassword_Confirmation={setPassword_Confirmation}
              setToken={setToken}
              loading={loading}
              errors={errors}
              message={message}
            />
          </form>
        </main>
        <section className="row mt-1">
          <ResetExtra />
        </section>
      </div>
    </>
  );
};
ResetForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setPassword_Confirmation: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired
};
export default ResetForm;
