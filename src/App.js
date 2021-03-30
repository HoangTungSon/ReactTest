import './App.css';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, matchPath, withRouter } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import Users from './component/User';
import Topics from './component/Topics';
import LoginPage from './component/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Update from './component/update';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/home/:id">
            <Update />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
