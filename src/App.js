import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path to="/" component={Login} />
          <Route path to="/register" component={Register} />
          <Route path to="/reset" component={Reset} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
