import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/app">
              <Home />
            </PrivateRoute>
          </Switch>
        </Router>
      </header>
    </div>

  );
}

export default App;
