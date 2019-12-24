import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Nairobi from "./Nairobi";
import Nav from "./Nav";
import Kisumu from "./Kisumu";

class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        `${props.match.url}/welcome`,
        `${props.match.url}/Nairobi`,
        `${props.match.url}/Kisumu`
      ]
    };
  }

  renderRoute = (RouteComponent, url) => (
    <Route
      path={url}
      component={newProps => (
        <RouteComponent {...{ ...this.props, match: newProps.match }} />
      )}
    />
  );

  render() {
    const { routes } = this.state;
    return (
      <div>

        <React.Fragment>
          <Nav />
          <Switch>
            {this.renderRoute(Welcome, routes[0])}
            {this.renderRoute(Nairobi, routes[1])}
            {this.renderRoute(Kisumu, routes[2])}
          </Switch>
        </React.Fragment>
      </div>
    );
  }
}
export default Landing;
