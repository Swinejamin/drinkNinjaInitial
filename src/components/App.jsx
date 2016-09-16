'use strict';

import React from 'react';
import auth from '../modules/auth';
import {Link, withRouter} from 'react-router';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import LeftMenu from './LeftMenu'
const currentTheme = darkBaseTheme;

const App = React.createClass({
    propTypes: {
        children: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            loggedIn: auth.loggedIn(),
            docked: false,
            drawerOpen: false
        };
    },

    getChildContext() {
        return {
            muiTheme: getMuiTheme(currentTheme),
            // userData: this.state.userData
        };
    },
    componentWillMount() {
        auth.onChange = this.updateAuth;
    },
    componentDidMount() {

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
    updateAuth(loggedIn) {
        this.setState({
            loggedIn: loggedIn
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
                        {(this.state.loggedIn ? () => {
                            return (
                                <div>
                                    <Link to={'/'}><MenuItem onTouchTap={this.toggleDrawer}>Dashboard</MenuItem></Link>
                                    <Link to={'/suggestions'}><MenuItem
                                        onTouchTap={this.toggleDrawer}>Suggestions</MenuItem></Link>
                                    <Link to={'/about'}><MenuItem onTouchTap={this.toggleDrawer}>About</MenuItem></Link>
                                </div>
                            );
                        } : (
                            <Link to="/login"><MenuItem onTouchTap={this.toggleDrawer}>Sign in</MenuItem></Link>
                        ))() }

                    </Drawer>
                    {this.props.children}
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


