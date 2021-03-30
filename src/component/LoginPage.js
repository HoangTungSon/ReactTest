import React, { Component } from 'react';
import './Login.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Home from './Home'

import Login from "./login.component";
import SignUp from "./signup.component";

export default function LoginPage() {
  const match = useRouteMatch();

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={`${match.path}/sign-in`}>positronX.io</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`${match.path}/sign-in`}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`${match.path}/sign-up`}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            
            <Route path={["/", `${match.path}/sign-in`]} >
              <Login />
            </Route>
            <Route path={`${match.path}/sign-up`} >
              <SignUp />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}