import React, { Component, useState } from "react";
import { Redirect, useRouteMatch, useHistory } from "react-router-dom";
import api from "../api/api";
import { Container } from "react-bootstrap";

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const match = useRouteMatch();
    const history = useHistory();

    const handleSubmit = event => {
        const body = { email: email, password: password }
        api(`http://localhost:3001/login`, body, 'POST').then(user => {
            localStorage.setItem('accessToken', user.accessToken);
        });
        history.push('/home')
        event.preventDefault();
    }

    return (
        <Container fluid>
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name='email' className="form-control" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name='password' className="form-control" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </Container>
    );
}