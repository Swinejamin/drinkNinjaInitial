var React = require('react');

var MasterIngredientList = require('./MasterIngredientList.jsx');

var IngredientAdder = React.createClass({

    getInitialState: function () {
        return {ingredientName: '', ingredientType: 'Alcohol'};
    },
    handleNameChange: function (e) {
        this.setState({ingredientName: e.target.value});
    },
    handleTypeChange: function (e) {
        this.setState({ingredientType: e.target.value});
    },
    handleNewIngredient: function (thisVal) {
        var userData = this.props.userData;
        return function (value) {
            console.log(value, value['.key']);
            var target = userData.child('ingredients').child(value['.key']);
            // console.log(target);
            target.set(value.ingredientName);

            // thisVal.setState({
            //     ingredientList: value,
            // });
        }
    },
    componentDidMount: function () {
        this.userRef = firebase.database().ref(this.props.userData);
        this.bindAsArray(this.userRef.child('ingredients'), 'ingredients');

    }, render: function () {
        return (
            <div className="input-group">
                <MasterIngredientList changeFunc={this.handleNewIngredient} multi={false}/>
            </div>
        )
    }
});

module.exports = IngredientAdder;