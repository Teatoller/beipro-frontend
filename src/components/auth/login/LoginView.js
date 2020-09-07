import React from "react";
import PropTypes from "prop-types";
import Footer from "../../Landing/Footer";
import LoginNav from "./LoginNav";
import { LoginForm } from "./LoginForm";
import { LoginSidebar } from "./LoginSidebar";

function LoginView(props) {
  const { loading, onSubmit, inputs, onChange, errors } = props;
  return (
    <>
      <LoginNav />
      <div className="container" aria-label="Login form">
        <div className="row">
          <LoginForm
            loading={loading}
            onSubmit={onSubmit}
            inputs={inputs}
            errors={errors}
            onChange={onChange}
          />
          <LoginSidebar />
        </div>
      </div>
      <Footer />
    </>
  );
}
LoginView.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.shape().isRequired,
  onChange: PropTypes.shape().isRequired,
  inputs: PropTypes.string.isRequired,
  errors: PropTypes.shape().isRequired
};
export default LoginView;
