import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import JobBoard from './pages/JobBoard';
import PrivateRoute from './utils/PrivateRoute';
import Homepage from './pages/HomepageRoute';
import JobDetail from './pages/JobDetail';
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
        <PrivateRoute exact path="/">
          <Redirect to="/Home" />
        </PrivateRoute>
        <PrivateRoute path="/Home">
          <Homepage tabValue={'/Home'} />
        </PrivateRoute>
        <PrivateRoute path="/About">
          <Homepage tabValue={'/About'} about />
        </PrivateRoute>
        <PrivateRoute path="/ContactUs">
          <Homepage tabValue={'/ContactUs'} />
        </PrivateRoute>
        <Route path="/Login">
          <Login />
        </Route>
        <PrivateRoute path="/app">
          <JobBoard />
        </PrivateRoute>
        <PrivateRoute path="/JobDetail/:id">
          <JobDetail />
        </PrivateRoute>
        <Route path="*">
          <Unknown404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
