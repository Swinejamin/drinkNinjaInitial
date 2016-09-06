var React = require('react');
var MasterIngredientList = require('./MasterIngredientList.jsx');
// var Select = require('react-select');

var RecipeAdder = React.createClass({
    getInitialState: function () {
        return {Title: ''};
    },
    handleTitleChange: function (e) {
        this.setState({recipeTitle: e.target.value});
    },
    handleIngredientChange: function (thisVal) {
        return function (value) {
            thisVal.setState({
                ingredientList: value,
            });
        }
    },
    handleStepChange: function (e) {
        this.setState({recipeStep: e.target.value});
    },
    componentDidMount: function () {
        var ref = firebase.database().ref('ingredients');
        this.bindAsArray(ref, 'ingredients');

    },
    mixins: [ReactFireMixin],
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="recipeName"> Recipe Name </label>
                    <input type="text" id='recipeName' className="form-control"
                           value={this.state.recipeName} onChange={this.handleTitleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="ingredients"> Ingredients </label>
                    <MasterIngredientList changeFunc={this.handleIngredientChange} multi={true}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="recipeStep"> Steps </label>
                    <div className="input-group">
                        <input type="text" id='recipeStep' className="form-control"
                               value={this.state.recipeStep} onChange={this.handleStepChange}/>
                        <span className="input-group-addon">+</span>
                    </div>

                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        )
    },
    handleSubmit: function (e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.firebaseRef.push({
            ingredientName: this.state.ingredientName,
            ingredientType: this.state.ingredientType
        });
        this.setState({ingredientName: ""});
    }
});

module.exports = RecipeAdder;