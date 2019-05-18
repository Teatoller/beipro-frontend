import React from 'react'; 
import { Route, IndexRoute } from 'react-router';
import HomePage from './components/HomePage';

// IndexRoute maps HomePage component to the default route
export default (
  <Route path="/"> 
    <IndexRoute component={HomePage} />
  </Route>
);