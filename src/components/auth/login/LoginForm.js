import React from "react";
import PropTypes from "prop-types";
import { LoginTextInput } from "./LoginTextInput";
import { Spinner } from "../../../spinner/Spinner";
import { LoginExtra } from "./LoginExtra";

export const LoginForm = props => {
  const { loading, onSubmit, inputs, errors, onChange, message } = props;
  return (
    <>
      <div className="col-8 p-2">
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
              message={message}
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
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
export default LoginForm;
