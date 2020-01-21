/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import Welcome from "./components/Landing/Welcome";
import FrontAdmin from "./components/Admin/FrontAdmin"
import Depots from "./components/Landing/Depots"
import Profile from "./components/Auth/Profile";
import CompanyAdmin from "./components/Admin/CompanyAdmin";
import CompanyAdminEdit from "./components/Admin/CompanyAdminEdit";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/reset" component={Reset} />
            <Route path="/welcome" component={Welcome} />
            <Route exact path="/admin" component={CompanyAdmin} />
            <Route exact path="/adminedit" component={CompanyAdminEdit} />
            <Route exact path="/fadmin" component={FrontAdmin} />
            <Route exact path="/depots" component={Depots} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
