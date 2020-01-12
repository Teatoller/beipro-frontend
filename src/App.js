/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
// import Landing from "./components/Landing/Landing";
import Welcome from "./components/Landing/Welcome";
import FrontAdmin from "./components/Admin/FrontAdmin"
import Depots from "./components/Landing/Depots"
import Profile from "./components/Auth/Profile";

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
            {/* <Route exact path="/landing" component={Landing} /> */}
            <Route path="/welcome" component={Welcome} />
            <Route exact path="/fadmin" component={FrontAdmin} />
            <Route exact path="/depots" component={Depots} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
