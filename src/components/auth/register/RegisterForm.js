import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../../spinner/Spinner";
import { RegisterTextInput } from "./RegisterTextInput";
import { RegisterExtra } from "./RegisterExtra";
import { RegisterSidebar } from "./RegisterSidebar";

export const RegisterForm = props => {
  const { loading, onChange, onSubmit, inputs, errors, checkbox, handleAlert } = props;
  return (
    <>
      <div className="container" aria-label="Sign-up form">
        <div className="row">
          <div className="col-8">
            <span>{loading ? <Spinner /> : null}</span>
            <header className="text-center">
              <p className="text-secondary">Please Sign up</p>
            </header>
            <main>
              <form onSubmit={onSubmit}>
                <RegisterTextInput
                  firstname={inputs}
                  lastname={inputs}
                  email={inputs}
                  onChange={onChange}
                  password={inputs}
                  password_confirmation={inputs}
                  loading={loading}
                  errors={errors}
                  checkbox={checkbox}
                  handleAlert={handleAlert}
                />
              </form>
            </main>
            <section>
              <RegisterExtra />
            </section>
          </div>
          <RegisterSidebar />
        </div>
      </div>
    </>
  );
};
RegisterForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.bool.isRequired,
  handleAlert: PropTypes.func.isRequired,
  checkbox: PropTypes.bool.isRequired
};
export default RegisterForm;
