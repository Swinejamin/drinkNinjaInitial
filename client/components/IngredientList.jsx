var React = require('react');

var IngredientTag = require('./IngredientTag.jsx');

var IngredientList = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentWillMount: function () {
        this.bindAsArray(this.props.listSource, 'ingredients');
    },
    render: function () {
        var listSource = this.props.listSource;
        return (
            <div>
                <h1>Current Ingredients</h1>
                <div>
                    {this.state.ingredients.map(function (ingredient) {
                        return (<IngredientTag listSource={listSource} key={ingredient['.key']} content={ingredient}/>);
                    })}
                </div>

            </div>
        );

    },
    mixins: [ReactFireMixin],
    componentWillUnmount: function () {
        this.firebaseRef.off();
    }
});

module.exports = IngredientList;