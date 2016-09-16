'use strict';

import Rebase from 're-base';
const base = Rebase.createClass({
    apiKey: 'AIzaSyAu0WdxVgdV_HPz28RoYfHb-W7P7aIGkN0',
    authDomain: 'drinkme-6efd3.firebaseapp.com',
    databaseURL: 'https://drinkme-6efd3.firebaseio.com',
    storageBucket: 'drinkme-6efd3.appspot.com'
});
const myBase = {
    getCurrentUser() {
        return base.auth().currentUser;
    },
    getUserNode() {
        return base.bindToState(`users/${this.uid}`, {
            context: this,
            state: 'user',
            asArray: false,
        });
    },
    getUserIngredients() {
        base.bindToState(`users/${this.uid}/ingredients`, {
            context: this,
            state: 'ingredients',
            asArray: false,
            then() {
                this.setState({loading: 'hide'});
            }
        })
    }
};

export default base;
