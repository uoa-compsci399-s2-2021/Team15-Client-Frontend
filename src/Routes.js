import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import JobBoard from './pages/JobBoard';
import PrivateRoute from './utils/PrivateRoute';
import Homepage from './pages/HomepageRoute';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/app">
          <JobBoard />
        </PrivateRoute>
        <Route path="/about">
          <Homepage tabValue={1} />
        </Route>
        <Route path="/">
          <Homepage tabValue={0} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
