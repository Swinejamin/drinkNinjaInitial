import $ from 'jquery';
import base from './rebase';


const auth = {
    login(email, password, passCallback, failCallback) {
        let err = null;
        let userData = null;
        if (email != null && password != null) {
            // cb = arguments[arguments.length - 1];
            base.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    user.getToken(/* forceRefresh */ true).then((idToken) => {
                        $.ajax({
                            url: '/api/user/' + idToken,
                            type: 'POST'
                        }).then((res) => {
                            localStorage.setItem('token', JSON.stringify(res.token));
                        });
                    });
                    this.onChange(true);
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
                        this.onChange(true);
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
            const targetStr = `users/${myBase.base.auth().currentUser.uid}`;
            const target = myBase.base.database().ref(targetStr);
            target.remove();
            base.auth().currentUser.delete();
        } else {
            base.unauth();
        }

        this.onChange(false);
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
    isAdmin() {
        return base.onAuth((authData) => {
            base.database().ref(`users/${authData.uid}/isAdmin`).on('value', (snap) => {
                return snap.val();
            });
        });
    },
    onChange() {
    }
};

export default auth;
