import React, { PureComponent } from "react";

class ErrorBoundary extends PureComponent {
    constructor() {
      super();
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
      if (this.state.hasError) {
        return <h1>"Error Message: Something went wrong</h1>;
      } else {
        return this.props.children;
      }
    }
  }
  export default ErrorBoundary;