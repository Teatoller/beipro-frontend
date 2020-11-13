/* eslint-disable max-len */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <h1 className="alert alert-danger text-center">
          &quot;Error Message: Something went wrong&quot;
        </h1>
      );
    }
    return children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.shape().isRequired
};
export default ErrorBoundary;
