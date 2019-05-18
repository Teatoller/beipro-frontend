import React from 'react'; 
import { Route, IndexRoute } from 'react-router';
import HomePage from '../components/HomePage';
import App from '../services/App'

// Map components to different routes.
// The parent component wraps other components and serves as the entrance to 
// other React components.
// IndexRoute maps HomePage component to the default route
export default (
  <Route path="/" component={App}> 
    <IndexRoute component={HomePage} />
  </Route>
);
