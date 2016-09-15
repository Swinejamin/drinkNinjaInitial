// import Base from '../components/Base';
import React from 'react';
import {render} from 'react-dom'
import App from '../components/App';
import Dashboard from '../components/Dashboard';
import Console from '../components/Console';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import auth from '../modules/auth';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
function requireAuth(nextState, replace, cb) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        });
    }
    cb();
}
function checkAuth(nextState, replace, cb) {
    if (auth.loggedIn()) {
        replace({
            pathname: '/dashboard'
        });
    }
    cb();
}
function logout(nextState, replace, cb) {
    auth.logout();
    replace({
        pathname: '/login'
    });
    cb(null, LoginForm);
}
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard} onEnter={requireAuth}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
            <Route path="console" component={Console} onEnter={requireAuth}/>
            <Route path="login" component={LoginForm} onEnter={checkAuth}/>
            <Route path="logout" component={LoginForm} onEnter={logout}/>
            <Route path="register" component={SignUpForm}/>
        </Route>
    </Router>
), document.getElementById('container'));
