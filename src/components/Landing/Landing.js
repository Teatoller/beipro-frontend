import React, { PureComponent } from "react";
// import { Switch, Route } from "react-router-dom";
// import Welcome from "./Welcome";
// import Depots from "./Depots";
// import Nav from "./Nav";

class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // routes: [`${props.match.url}/welcome`, `${props.match.url}/depots`]
    };
  }

  // renderRoute = (RouteComponent, url) => (
  //   <Route
  //     path={url}
  //     component={newProps => <RouteComponent {...{ ...this.props, match: newProps.match }} />}
  //   />
  // );

  render() {
    // const { routes } = this.state;
    return (
      <div>
        <React.Fragment>
          {/* <Nav /> */}
          {/* <Switch>
            {this.renderRoute(Welcome, routes[0])}
            {this.renderRoute(Depots, routes[1])}
          </Switch> */}
        </React.Fragment>
      </div>
    );
  }
}
export default Landing;
