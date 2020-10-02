import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../../spinner/Spinner";
import { ResetExtra } from "./ResetExtra";
import { ResetTextInput } from "./ResetTextInput";

export const ResetForm = props => {
  const { loading, onSubmit, onChange, inputs, errors, message } = props;
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
              email={inputs}
              onChange={onChange}
              password={inputs}
              password_confirmation={inputs}
              loading={loading}
              errors={errors}
              message={message}
              handleAlert={onChange}
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
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default ResetForm;
