'use strict';

import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Link, withRouter, browserHistory} from 'react-router';
import auth from '../modules/auth';

const LoginForm = withRouter(
    React.createClass({
        propTypes: {
            location: React.PropTypes.object.isRequired,
            router: React.PropTypes.object.isRequired
        },
        getInitialState() {
            return {email: '', password: '', emailError: '', passwordError: ''};
        },
        handleEmailChange(e) {
            this.setState({email: e.target.value});
        },
        handlePasswordChange(e) {
            this.setState({password: e.target.value});
        },
        handleSubmit(event) {
            event.preventDefault();

            const email = this.state.email.trim();
            const password = this.state.password.trim();
            auth.login(email, password, this.handleLoginSuccess, this.handleLoginFailure);
        },
        handleAnon(event) {
            event.preventDefault();
            auth.loginAnonymously(this.handleLoginSuccess, this.handleLoginFailure);
        },
        handleLoginFailure(error) {
            console.log(error);
            const errorCode = error.code;
            let emailError = '';
            let passwordError = '';

            if (errorCode === 'auth/invalid-email') {
                emailError = 'Woops! Looks like your email isn\'t formatted properly!';
                passwordError = '';
            }
            if (errorCode === 'auth/wrong-password') {
                emailError = '';
                passwordError = 'Woops! Something\'s wrong with your passsword!';
            }
            if (errorCode === 'auth/user-not-found') {
                emailError = 'Woops! We couldn\'t find a user with that email!';
                passwordError = '';
            }
            console.log(errorCode + ': ' + error.message);
            return this.setState({
                emailError: emailError,
                passwordError: passwordError
            });
        },
        handleLoginSuccess() {
            const {location} = this.props;
            const router = this.props.router;
            if (location.state && location.state.nextPathname) {
                console.log(router);
                console.log('replacing path with ' + location.state.nextPathname + ' as requested');
                // browserHistory.push(location.state.nextPathname);
                router.replace(location.state.nextPathname);
            } else {
                console.log('replacing path with \'/\'');
                // browserHistory.push('/dashboard');
                router.replace('dashboard');
            }
        },
        render() {
            return (
                <Paper className="loginForm">
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Login"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <TextField
                            fullWidth={true}
                            hintText="benjamin@example.com"
                            type="email"
                            floatingLabelText="Email address"
                            errorText={this.state.emailError}
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            fullWidth={true}
                            hintText="****************"
                            type="password"
                            floatingLabelText="Password"
                            errorText={this.state.passwordError}
                            onChange={this.handlePasswordChange}
                        />
                        <div className="button-group">
                            <Link to="/register">
                                <RaisedButton label="Register" secondary={true}/>
                            </Link>
                            <RaisedButton label="Login" primary={true} onClick={this.handleSubmit}/>
                        </div>
                        <p>Don't have/want an account?
                            <br />
                            <FlatButton label='Browse as a guest instead.' onClick={this.handleAnon}/>
                        </p>

                    </form>
                </Paper>

            );
        }
    }));

export default LoginForm;
