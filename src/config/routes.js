// import Base from '../components/Base';
import React from 'react';
import {render} from 'react-dom';
import App from '../components/views/App';
import Dashboard from '../components/views/Dashboard';
import Console from '../components/views/Console';
import Suggestions from '../components/views/Suggestions';
import LoginForm from '../components/views/LoginForm';
import RecipeDetailView from '../components/views/RecipeDetailView';
import AboutView from '../components/views/AboutView.jsx';
import SignUpForm from '../components/views/SignUpForm';
import auth from '../modules/auth';
import {Router, Route, IndexRoute, hashHistory, browerHistory} from 'react-router';
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
        if (auth.isAdmin()) {
            replace({
                pathname: '/console'
            });
        } else {
            replace({
                pathname: '/dashboard'
            });
        }
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
            <Route path="console" component={Console} onEnter={auth.requireAdmin}/>
            <Route path="suggestions" component={Suggestions} onEnter={requireAuth}/>
            <Route path="recipe/:key" component={RecipeDetailView}/>
            <Route path="about" component={AboutView}/>
            <Route path="login" component={LoginForm} onEnter={checkAuth}/>
            <Route path="logout" component={LoginForm} onEnter={logout}/>
            <Route path="register" component={SignUpForm}/>
        </Route>
    </Router>
), document.getElementById('container'));
