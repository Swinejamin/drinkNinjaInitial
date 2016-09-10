var React = require('react');

var RecipeTemplate = React.createClass({
    render: function () {
        return (
            <div className="card" itemScope itemType="http://schema.org/Recipe">
                <div className="card-block">
                    <h4 className="card-title" itemProp="name">{this.props.title}</h4>
                    <p className="card-text" itemProp="description">{this.props.description}</p>
                </div>
                <ul className="list-group list-group-flush" >
                    {this.props.ingredients.map(function (ingredient, index) {
                        return (
                            <span itemProp="recipeIngredient" key={index} className="list-group-item">{ingredient.ingredientName}</span>
                        );
                    })}
                </ul>
                <ul itemProp="recipeInstructions" className="list-group list-group-flush">
                    {this.props.steps.map((step, index) => {
                        return (
                            <li  key={index} className="list-group-item">{step.text} </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

module.exports = RecipeTemplate;