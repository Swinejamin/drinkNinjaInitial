'use strict';

import React from 'react';
import auth from '../modules/auth';
import {Link} from 'react-router';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const currentTheme = darkBaseTheme;

const App = React.createClass({
    getInitialState() {
        return {
            loggedIn: auth.loggedIn()
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
    updateAuth(loggedIn) {
        this.setState({
            loggedIn: loggedIn
        });
    },
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(currentTheme)}>
                <Paper className="wrapper">
                    <AppBar title="Drink finder app" iconElementRight={
                         this.state.loggedIn ? (
                            <Link to="/logout"><FlatButton label="Sign out" /></Link>
                            ) : (
                            <Link to="/login"><FlatButton label="Sign in"/></Link>
                            ) }/>
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

module.exports = App;


