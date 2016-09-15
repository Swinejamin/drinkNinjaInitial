/*global document firebase*/

(function () {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');

    var IngredientList = require('./components/TagListBuilder.jsx');
    var IngredientFinder = require('./components/IngredientFinder.jsx');
    var RecipeBrowser = require('./components/RecipeBrowser.jsx');


    var user, userData, ingredients;
    firebase.auth().onAuthStateChanged(function (usr) {
        if (usr) {
            user = firebase.auth().currentUser;
            userData = firebase.database().ref('users/' + user.uid);
            ingredients = userData.child('ingredients');
            ReactDOM.render(<IngredientFinder userData={userData}/>, document.getElementById("ingredientAdder"));
            // ReactDOM.render(<RecipeBrowser />, document.getElementById("recipeBrowser"));
            ReactDOM.render(<IngredientList listSource={ingredients}/>, document.getElementById("ingredientList"));
        } else {
            // No user is signed in.
            window.location.push('/login');
        }
    });


}());
