var React = require('react');

var RecipeTemplate = React.createClass({
    render: function () {
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">{this.props.title}</h4>
                    <p className="card-text">{this.props.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {this.props.ingredients.map(function (ingredient, index) {
                        return (
                            <span key={index} className="list-group-item">{ingredient.label}</span>
                        );
                    })}
                </ul>
                <ul className="list-group list-group-flush">
                    {this.props.steps.map((step, index) => {
                        return (
                            <li key={index} className="list-group-item">{step.text} </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

module.exports = RecipeTemplate;