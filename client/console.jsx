/*global $ React ReactDOM document firebase*/

(function () {
    "use strict";
    var Select = require('react-select');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var RecipeAdder = require('./components/RecipeAdder.jsx');

    var IngredientAdder = require('./components/IngredientAdder.jsx');

    ReactDOM.render(<IngredientAdder />, document.getElementById("ingredientAdder"));
    ReactDOM.render(<RecipeAdder />, document.getElementById("recipeAdder"));
}());
