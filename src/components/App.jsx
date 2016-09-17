'use strict';

import React from 'react';
import auth from '../modules/auth';
import {Link, withRouter} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import theme from '../config/theme'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import base from '../modules/rebase';


import LeftMenu from './LeftMenu'
const currentTheme = theme;

const App = React.createClass({
    propTypes: {
        children: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            loggedIn: auth.loggedIn(),
            docked: false,
            drawerOpen: false,
            isAdmin: false,
            user: {},
            ingredients: {},
            masterIngredients: {},
            loading: 'loading',
            tags: {},
            recipes: {},
            units: {}
        };
    },

    getChildContext() {
        return {
            muiTheme: getMuiTheme(currentTheme),
            // userData: this.state.userData
        };
    },
    componentWillMount() {
        base.onAuth((authData) => {
            if (authData) {
                const unitsRef = 'units';
                const tagsRef = 'tags';
                const recipesRef = 'recipes';
                this.uid = base.auth().currentUser.uid;
                this.user = base.bindToState(`users/${this.uid}`, {
                    context: this,
                    state: 'user',
                    asArray: false,
                    then() {
                        this.setState({
                            isAdmin: this.state.user.isAdmin
                        });
                    }
                });
                this.ingredients = base.bindToState(`users/${this.uid}/ingredients`, {
                    context: this,
                    state: 'ingredients',
                    asArray: false,
                    then() {
                        this.setState({loading: 'hide'});
                    }
                });
                this.masterIngredients = base.bindToState('ingredients', {
                    context: this,
                    state: 'masterIngredients',
                    asArray: false
                });
                this.units = base.bindToState(unitsRef, {
                    context: this,
                    state: 'units',
                    asArray: false,
                });
                this.tags = base.bindToState(tagsRef, {
                    context: this,
                    state: 'tags',
                    asArray: false,
                });
                this.recipes = base.bindToState(recipesRef, {
                    context: this,
                    state: 'recipes',
                    asArray: false,
                });
            } else {
                console.log("User is logged out");
            }
        });
        auth.onChange = this.updateAuth;
        auth.setAdmin();

    },
    componentDidMount() {

    },
    componentWillUnmount() {
        if (this.user) {
            base.removeBinding(this.user);
        }
        if (this.masterIngredients) {
            base.removeBinding(this.masterIngredients);
        }
        if (this.ingredients) {
            base.removeBinding(this.ingredients);
        }
        base.removeBinding(this.units);
        base.removeBinding(this.tags);
        base.removeBinding(this.recipes);
    },
    handleLeftIconTap() {
        const neg = !this.state.drawerOpen;
        this.setState({
            drawerOpen: neg
        });
    },
    toggleDrawer() {
        const neg = !this.state.drawerOpen;
        this.setState(
            {
                drawerOpen: neg
            }
        );
    },
    handleTitleTap() {

    },
    updateAuth(loggedIn, isAdmin) {
        this.setState({
            loggedIn: loggedIn,
            isAdmin: isAdmin
        });
    },
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(currentTheme)}>
                <Paper className="wrapper">
                    <AppBar title="Drink finder app"
                            onTitleTouchTap={this.handleTitleTap}
                            onLeftIconButtonTouchTap={this.handleLeftIconTap}
                            iconElementRight={
                                this.state.loggedIn ? (
                                    <Link to="/logout"><FlatButton label="Sign out"/></Link>
                                ) : (
                                    <Link to="/login"><FlatButton label="Sign in"/></Link>
                                ) }/>
                    <Drawer id="Drawer" docked={this.state.docked} open={this.state.drawerOpen}
                            onRequestChange={this.toggleDrawer} width={300}>
                        {(this.state.loggedIn ?
                                () => {
                                    return (
                                        <div>
                                            <MenuItem containerElement={<Link to={'/'}/>}
                                                      onTouchTap={this.toggleDrawer}>Dashboard</MenuItem>
                                            <MenuItem containerElement={<Link to={'/suggestions'}/>}
                                                      onTouchTap={this.toggleDrawer}>Suggestions</MenuItem>
                                            <MenuItem containerElement={<Link to={'/about'}/>}
                                                      onTouchTap={this.toggleDrawer}>About</MenuItem>
                                            <Divider />
                                            <MenuItem disabled={!this.state.isAdmin}
                                                      containerElement={<Link to={'/console'}/>}
                                                      onTouchTap={this.toggleDrawer}
                                                      secondaryText={auth.isAdmin() ? '' : 'Requires admin access'}>Console</MenuItem>
                                        </div>
                                    );
                                } :
                                () => {
                                    return (<MenuItem containerElement={<Link to={'/login'}/>}
                                                      onTouchTap={this.toggleDrawer}>Sign in</MenuItem>);
                                }
                        )()}

                    </Drawer>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="example"
                        transitionEnterTimeout={5000}
                        transitionLeaveTimeout={5000}>
                        {this.props.children && React.cloneElement(this.props.children, {
                            uid: this.uid,
                            user: this.state.user,
                            masterIngredients: this.state.masterIngredients,
                            ingredients: this.state.ingredients,
                            units: this.state.units,
                            tags: this.state.tags,
                            recipes: this.state.recipes,
                            loading: this.state.loading
                        })}

                    </ReactCSSTransitionGroup>
                </Paper>
            </MuiThemeProvider>

        );
    }
});

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    // userData: React.PropTypes.object.isRequired
};

export default App;


