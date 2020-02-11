import React, { Component } from "react";
import Spinner from "./Spinner";

class UseSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    const showSpinner = () => {
      this.setState({ loading: true });
    };

    const hideSpinner = () => {
      this.setState({ loading: false });
    };

    const { loading } = this.state;

    const spinner = loading ? <Spinner /> : <Spinner/>;
    return (
    <div>
        {spinner}, {showSpinner}, {hideSpinner}
    </div>
    );
  }
}
export default UseSpinner;
