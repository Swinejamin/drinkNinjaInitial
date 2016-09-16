import $ from 'jquery';
import base from './rebase';


const auth = {
    userIsAdmin: false,
    login(email, password, passCallback, failCallback) {
        let err = null;
        let userData = null;
        if (email != null && password != null) {
            // cb = arguments[arguments.length - 1];
            base.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    base.database().ref(`users/${user.uid}/isAdmin`).on('value', (snap) => {
                        const answer = snap.val() ? snap.val() : false;
                        this.userIsAdmin = answer;
                        this.onChange(true, this.userIsAdmin);
                    });
                    user.getToken(/* forceRefresh */ true).then((idToken) => {
                        $.ajax({
                            url: '/api/user/' + idToken,
                            type: 'POST'
                        }).then((res) => {
                            localStorage.setItem('token', JSON.stringify(res.token));
                        });
                    });

                    passCallback();
                })
                .catch((error) => {
                    // Handle Errors here.
                    err = error;
                    failCallback(error);
                });
        }
    },
    loginAnonymously(passCallback, failCallback) {
        let user = base.auth().signInAnonymously().then((user)=> {
            user.getToken(/* forceRefresh */ true)
                .then((idToken) => {
                    $.ajax({
                        url: '/api/user/' + idToken,
                        type: 'POST'
                    }).then((res) => {
                        localStorage.setItem('token', JSON.stringify(res.token));
                        this.onChange(true, false);
                        passCallback();
                    });
                })
                .catch((error)=> {
                    failCallback(error);
                });
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
        base.onAuth((user) => {
            base.database().ref(`users/${user.uid}/isAdmin`).on('value', (snap) => {
                const answer = snap.val() ? snap.val() : false;
                this.userIsAdmin = answer;
            });
        });
    },
    isAdmin() {

        return this.userIsAdmin;
    },
    onChange() {
    }
};

export default auth;
