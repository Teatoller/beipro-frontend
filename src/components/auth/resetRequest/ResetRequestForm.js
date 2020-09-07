import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../../spinner/Spinner";
import ResetRequestExtra from "./ResetRequestExtra";
import { ResetRequestTextInput } from "./ResetRequestTextInput";
import { ResetRequestSidebar } from "./ResetRequestSidebar";

export const ResetRequestForm = props => {
  const { loading, onChange, onSubmit, inputs, errors } = props;
  return (
    <>
      <div className="container" aria-label="Password reset request form">
        <div className="row">
          <div className="col-6 m-auto">
            <span>{loading ? <Spinner /> : null}</span>
            <header className="text-center">
              <p className="text-secondary">
                Please enter your Email address below and we&apos;ll send you a link to reset your
                password
              </p>
            </header>
            <main>
              <form onSubmit={onSubmit}>
                <ResetRequestTextInput
                  email={inputs}
                  onChange={onChange}
                  errors={errors}
                  loading={loading}
                />
              </form>
            </main>
            <section className="row">
              <ResetRequestExtra />
            </section>
          </div>
          <ResetRequestSidebar />
        </div>
      </div>
    </>
  );
};
ResetRequestForm.propTypes = {
  inputs: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf.isRequired,
  loading: PropTypes.bool.isRequired
};
export default ResetRequestForm;
