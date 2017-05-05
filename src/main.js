require('./main.scss');
// import Base from '../components/Base';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
// app & views
import App from '../components/views/App';
// import Dashboard from './components/views/Dashboard';
// import Console from '../components/views/Console';
// import Suggestions from '../components/views/Suggestions';
// import LoginForm from './components/views/LoginForm';
// import SignUpForm from '../components/views/SignUpForm';
// import AboutView from '../components/views/AboutView';

// Recipes
// import RecipeBrowser from '../components/recipes/RecipeBrowser';
// import RecipeDetailView from '../components/views/RecipeDetailView';

// Ingredients
// import IngredientAdder from '../components/ingredients/IngredientAdder';

// Tags
// import TagAdder from '../components/tags/TagAdder';

// Units
// import UnitAdder from '../components/units/UnitAdder';

// Users
// import UserEditor from '../components/users/UserEditor';

// config & modules
// import auth from '../modules/auth';
//
// function requireAuth(nextState, replace, cb) {
//     if (!auth.loggedIn()) {
//         replace({
//             pathname: '/login',
//             state: {nextPathname: nextState.location.pathname}
//         });
//     }
//     cb();
// }
// function checkAuth(nextState, replace, cb) {
//     if (auth.loggedIn()) {
//         if (auth.isAdmin()) {
//             replace({
//                 pathname: '/console'
//             });
//         } else {
//             replace({
//                 pathname: '/dashboard'
//             });
//         }
//     }
//     cb();
// }
// function logout(nextState, replace, cb) {
//     auth.logout();
//     replace({
//         pathname: '/login'
//     });
//     cb(null, LoginForm);
// }

import routes from './config/routes'
ReactDOM.render((
    <Router>
        <div>

            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/suggestions">Suggestions</Link></li>
                </ul>
                {routes.map((route, index) => (
                    // You can render a <Route> in as many places
                    // as you want in your app. It will render along
                    // with any other <Route>s that also match the URL.
                    // So, a sidebar or breadcrumbs or anything else
                    // that requires you to render multiple things
                    // in multiple places at the same URL is nothing
                    // more than multiple <Route>s.
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.sidebar}
                    />
                ))}
            </nav>
            <div style={{ flex: 1, padding: '10px' }}>
                {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                ))}
            </div>
        </div>

    </Router>
), document.getElementById('root'));


