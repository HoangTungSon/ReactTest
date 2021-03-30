import React, { Component, useState, useEffect } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";

export default function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const match = useRouteMatch();

    // useEffect(() => {
    //     localStorage.removeItem('email');
    //     localStorage.removeItem('password');
    // })

    const handleSubmit = event => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        history.push('/login/sign-in')
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <Link to={`/login/sign-in`}>sign in?</Link>
            </p>
        </form>
    );
}