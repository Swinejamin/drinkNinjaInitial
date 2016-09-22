// import Base from '../components/Base';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
// app & views
import App from '../components/views/App';
import Dashboard from '../components/views/Dashboard';
import Console from '../components/views/Console';
import Suggestions from '../components/views/Suggestions';
import LoginForm from '../components/views/LoginForm';
import SignUpForm from '../components/views/SignUpForm';
import AboutView from '../components/views/AboutView';

// Recipes
import RecipeBrowser from '../components/recipes/RecipeBrowser';
import RecipeDetailView from '../components/views/RecipeDetailView';

// Ingredients
import IngredientAdder from '../components/ingredients/IngredientAdder';

// Tags
import TagAdder from '../components/tags/TagAdder';

// Units
import UnitAdder from '../components/units/UnitAdder';

// Users
import UserEditor from '../components/users/UserEditor';

// config & modules
import auth from '../modules/auth';

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
            <Route path="console" component={Console} onEnter={auth.requireAdmin}>
                <Route path="recipes" component={RecipeBrowser}/>
                <Route path="ingredients" component={IngredientAdder}/>
                <Route path="tags" component={TagAdder}/>
                <Route path="units" component={UnitAdder}/>
                <Route path="users" component={UserEditor}/>
            </Route>
            <Route path="suggestions" component={Suggestions} onEnter={requireAuth}/>
            <Route path="recipe/:key" component={RecipeDetailView}/>
            <Route path="about" component={AboutView}/>
            <Route path="login" component={LoginForm} onEnter={checkAuth}/>
            <Route path="logout" component={LoginForm} onEnter={logout}/>
            <Route path="register" component={SignUpForm}/>
        </Route>
    </Router>
), document.getElementById('container'));
