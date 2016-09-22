"use strict";

import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import auth from '../../modules/auth';
import {withRouter} from 'react-router';

const SignUpForm = withRouter(
    React.createClass({
        getInitialState() {
            return {email: '', password: '', firstName: '', lastName: ''};
        },
        handleFirstNameChange(e) {
            this.setState({firstName: e.target.value});
        },
        handleLastNameChange(e) {
            this.setState({lastName: e.target.value});
        },
        handleEmailChange(e) {
            this.setState({email: e.target.value});
        },
        handlePasswordChange(e) {
            this.setState({password: e.target.value});
        },
        handleSubmit(e) {
            e.preventDefault();
            const firstName = this.state.firstName.trim();
            const lastName = this.state.lastName.trim();
            const email = this.state.email.trim();
            const password = this.state.password.trim();
            auth.createUserWithEmailAndPassword(email, password, firstName, lastName, this.handleSignupSuccess, this.handleSignupFailure);
        },
        handleSignupFailure(error) {
            console.log(error);
            return this.setState({
                emailError: error.emailError,
                passwordError: error.passwordError
            });
        },
        handleSignupSuccess() {
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
                    <form id="signupForm" onSubmit={this.handleSubmit}>
                        <TextField
                            fullWidth={true}
                            hintText="Benjamin"
                            type="text"
                            floatingLabelText="First Name"
                            errorText={this.state.firstName ? '' : 'Required field'}
                            onChange={this.handleFirstNameChange}
                        />
                        <TextField
                            fullWidth={true}
                            hintText="Swineford"
                            type="text"
                            floatingLabelText="Last Name"
                            onChange={this.handleLastNameChange}
                        />

                        <TextField
                            fullWidth={true}
                            hintText="benjamin@example.com"
                            type="email"
                            floatingLabelText="Email address"
                            errorText={(this.state.email || this.state.emailError) ? this.state.emailError : 'Required field'}
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            fullWidth={true}
                            hintText="****************"
                            type="password"
                            floatingLabelText="Password"
                            errorText={(this.state.password || this.state.passwordError) ? this.state.passwordError : 'Required field'}
                            onChange={this.handlePasswordChange}
                        />
                        <div className="button-group">
                            <RaisedButton label="Sign up" primary={true} onClick={this.handleSubmit}/>
                        </div>
                        <p>Not quite ready to sign up?
                            <br />
                            <FlatButton label='Browse as a guest instead.' onClick={this.handleAnon}/>
                        </p>

                    </form>
                </Paper>
            );
        }
    })
);


export default SignUpForm;
