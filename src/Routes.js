import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import JobBoard from './pages/JobBoard';
import PrivateRoute from './utils/PrivateRoute';
import Homepage from './pages/HomepageRoute';
function Unknown404() {
  const location = useLocation();
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route path="/Home">
          <Homepage tabValue={0} />
        </Route>
        <Route path="/About">
          <Homepage tabValue={1} />
        </Route>
        <Route path="/ContactUs">
          <Homepage tabValue={1} />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <PrivateRoute path="/app">
          <JobBoard />
        </PrivateRoute>
        <Route path="*">
          <Unknown404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
