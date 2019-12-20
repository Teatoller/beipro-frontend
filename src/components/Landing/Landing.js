import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Nairobi from "./Nairobi";
import Nav from "./Nav";
import Kisumu from "./Kisumu";

class Landing extends PureComponent {
  render() {
    return (
      <Route>
        <React.Fragment>
          <Nav />
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Route path="/nairobi" component={Nairobi} />
            <Route path="/kisumu" component={Kisumu} />
          </Switch>
        </React.Fragment>
      </Route>
    );
  }
}
export default Landing;
