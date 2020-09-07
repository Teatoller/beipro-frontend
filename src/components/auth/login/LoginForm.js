import React from "react";
import PropTypes from "prop-types";
import { LoginTextInput } from "./LoginTextInput";
import { Spinner } from "../../../spinner/Spinner";
import { LoginExtra } from "./LoginExtra";

export const LoginForm = props => {
  const { loading, onSubmit, inputs, errors, onChange } = props;
  return (
    <>
      <div className="col-6 p-2">
        <span>{loading ? <Spinner /> : null}</span>
        <header className="text-center">
          <p className="text-secondary">Please Sign in</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <LoginTextInput
              email={inputs}
              password={inputs}
              onChange={onChange}
              errors={errors}
              loading={loading}
            />
          </form>
        </main>
        <section className="row">
          <LoginExtra />
        </section>
      </div>
    </>
  );
};
LoginForm.propTypes = {
  inputs: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf.isRequired,
  loading: PropTypes.bool.isRequired
};
export default LoginForm;
