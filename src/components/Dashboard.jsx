import React from 'react';
import IngredientFinder from './IngredientFinder.jsx';
import IngredientList from './IngredientList.jsx';
import Rebase from 're-base';

const base = Rebase.createClass({
    apiKey: 'AIzaSyAu0WdxVgdV_HPz28RoYfHb-W7P7aIGkN0',
    authDomain: 'drinkme-6efd3.firebaseapp.com',
    databaseURL: 'https://drinkme-6efd3.firebaseio.com',
    storageBucket: 'drinkme-6efd3.appspot.com'
});

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            ingredients: {},
            masterIngredients: {},
            loading: true
        };
        this.userRef = '';
    }

    componentDidMount() {
        base.onAuth((authData) => {
            if (authData) {
                console.log("User " + authData.uid + " is logged in with " + authData.provider);
                this.userRef = firebase.database().ref(`users/${base.auth().currentUser.uid}`);
                this.uid = base.auth().currentUser.uid;
                base.syncState(`users/${this.uid}`, {
                    context: this,
                    state: 'user',
                    asArray: false,
                    then() {
                        this.setState({loading: false});
                    }
                });
                base.syncState(`users/${this.uid}/ingredients`, {
                    context: this,
                    state: 'ingredients',
                    asArray: false
                });
                base.syncState('ingredients', {
                    context: this,
                    state: 'masterIngredients',
                    asArray: false
                });
            } else {
                console.log("User is logged out");
            }
        });
    }

    componentWillUnmount() {
        // base.removeBinding(this.ref);
    }

    handleAddIngredient(newIngredient) {
        console.log(newIngredient);
        const key = newIngredient.key;
        const data = {};
        data[key] = newIngredient.value;
        base.update(`users/${this.uid}/ingredients`, {
                data: data
            }
        )
        ;
    }

    removeTag(tag) {
        console.log(`users/${this.uid}/ingredients/${tag.key}`);
        const data = {};
        data[tag.key] = null;
        const targetStr = `users/${this.uid}/ingredients/${tag.key}`;
        const target = base.database().ref(targetStr);
        console.log(target);
        target.remove();
    }

    render() {
        return (
            <div>
                <IngredientFinder masterList={this.state.masterIngredients}
                                  addIngredient={this.handleAddIngredient.bind(this)}/>
                <IngredientList listSource={this.state.ingredients} removeTag={this.removeTag.bind(this)}/>
            </div>
        );
    }
}

export default Dashboard;

