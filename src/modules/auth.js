"use strict";

import $ from 'jquery';
import base from './rebase';


const auth = {
    authError(error, cb) {
        const errorCode = error.code;
        let emailError = '';
        let passwordError = '';
        if (errorCode === 'auth/invalid-email') {
            emailError = 'Woops! Looks like your email isn\'t formatted properly!';
            passwordError = '';
        }
        if (errorCode === 'auth/email-already-in-use') {
            emailError = 'Woops! Looks like there\'s already an account with that email!';
            passwordError = '';
        }
        if (errorCode === 'auth/wrong-password') {
            emailError = '';
            passwordError = 'Woops! Something\'s wrong with your passsword!';
        }
        if (errorCode === 'auth/weak-password') {
            emailError = '';
            passwordError = 'Woops! Try a stronger password!';
        }
        if (errorCode === 'auth/user-not-found') {
            emailError = 'Woops! We couldn\'t find a user with that email!';
            passwordError = '';
        }
        const res = {
            emailError: emailError,
            passwordError: passwordError
        };
        cb(res);
    },
    authSuccess(user, cb) {
        user.getToken(/* forceRefresh */ true)
            .then((idToken) => {
                $.ajax({
                    url: '/api/user/' + idToken,
                    type: 'POST'
                }).then((res) => {
                    localStorage.setItem('token', JSON.stringify(res.token));
                    this.onChange(true, false);
                    cb();
                });
            })
            .catch((error) => {
                // Handle Errors here.
                console.log(error);
            });
    },
    login(email, password, successCallback, failCallback) {
        if (email !== null && password !== null) {
            base.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    this.authSuccess(user, successCallback)
                        .catch((error) => {
                            this.authError(error, failCallback);
                        });
                })
                .catch((error) => {
                    this.authError(error, failCallback);
                });
        }
    },
    loginAnonymously(successCallback, failCallback) {
        base.auth().signInAnonymously()
            .then((user)=> {
                this.authSuccess(user, successCallback)
                    .catch((error) => {
                        this.authError(error, failCallback);
                    });
            })
            .catch((error) => {
                this.authError(error, failCallback);
            });
    },
    createUserWithEmailAndPassword(email, password, firstName, lastName, successCallback, failCallback) {
        base.auth().createUserWithEmailAndPassword(email, password)
            .then((user)=> {
                user.getToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        $.ajax({
                            url: '/api/user/' + idToken,
                            type: 'POST'
                        }).then((res) => {
                            localStorage.setItem('token', JSON.stringify(res.token));
                            this.onChange(true, false);
                            successCallback();
                        });
                    });
                // push user info to Users tree
                const target = base.database().ref('users');
                target.child(user.uid).set({email: email, firstName: firstName, lastName: lastName});

            })
            .catch((error) => {
                // Handle Errors here.
                failCallback(error);
            });
    },
    logout(cb) {
        delete localStorage.token;
        if (cb) cb();
        if (base.auth().currentUser.isAnonymous) {
            console.log('this chould delete the anon user');
            const targetStr = `users/${base.auth().currentUser.uid}`;
            const target = base.database().ref(targetStr);
            target.remove();
            base.auth().currentUser.delete();
        } else {
            base.unauth();
        }

        this.onChange(false, false);
    },
    getToken() {
        return localStorage.token;
    },
    getUser() {
        return base.auth().currentUser;
    },
    loggedIn() {
        return !!localStorage.token;
    },
    setAdmin() {
        return base.onAuth((user) => {
            base.database().ref(`users/${user.uid}/isAdmin`).on('value', (snap) => {
                const answer = snap.val() ? snap.val() : false;
                this.userIsAdmin = answer;
            });
        });
    },
    requireAuth(nextState, replace){
        if (base.auth().currentUser === null) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            });
        }
    },
    requireAdmin(nextState, replaceState, cb) {
        base.onAuth((user) => {
            base.database().ref(`users/${user.uid}/isAdmin`).on('value', (snap) => {
                if (snap.val() !== true) {
                    replaceState('/dashboard');
                    cb();
                } else {
                    cb();
                }
            });
        });
    },
    onChange() {
    }
};

export default auth;
