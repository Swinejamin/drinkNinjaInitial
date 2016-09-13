'use strict';

import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dashboard from './Dashboard.jsx';

import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: 'AIzaSyAu0WdxVgdV_HPz28RoYfHb-W7P7aIGkN0',
    authDomain: 'drinkme-6efd3.firebaseapp.com',
    databaseURL: 'https://drinkme-6efd3.firebaseio.com',
    storageBucket: 'drinkme-6efd3.appspot.com'
};
// const firebaseApp = firebase.initializeApp(firebaseConfig);


class App extends React.Component {
    constructor() {
        super();
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(baseTheme),
            // userData: this.state.userData
        };
    }


    render() {
        return (
            <div>
                <Dashboard />
            </div>

        );
    }
}
App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    // userData: React.PropTypes.object.isRequired
};

export default App;
