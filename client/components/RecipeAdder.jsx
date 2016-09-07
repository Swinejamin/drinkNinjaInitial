var React = require('react');
var update = require('react-addons-update');
var MasterIngredientList = require('./MasterIngredientList.jsx');
var RecipeTemplate = require('./RecipeTemplate.jsx');

var RecipeAdder = React.createClass({
    getInitialState: function () {
        return {recipeTitle: '', steps: [], newStep: '', ingredientList: [], description: ''};
    },
    handleTitleChange: function (e) {
        this.setState({recipeTitle: e.target.value});
    },
    handleStepChange: function (e) {
        this.setState({newStep: e.target.value});
    },
    handleIngredientChange: function (value) {
        this.setState({ingredientList: value});
    },
    handleAddStep: function (e) {
        var newState = update(this.state, {
            steps: {$push: [{text: this.state.newStep, key: Date.now()}]},
            newStep: ''
        });
        this.setState(newState);
        e.preventDefault();
    },
    handleDeleteStep: function (ind, e) {
        e.preventDefault();

        var newState = update(this.state, {
            steps: {$splice: [[ind, 1]]}
        });
        this.setState(newState);

    },
    componentDidMount: function () {
        var ref = firebase.database().ref('ingredients');
        this.bindAsArray(ref, 'ingredients');

    },
    mixins: [ReactFireMixin],
    render: function () {
        var thisRef = this;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="recipeName"> Recipe Name </label>
                        <input type="text" id='recipeName' className="form-control"
                               value={this.state.recipeTitle} onChange={this.handleTitleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="ingredients"> Ingredients </label>
                        <MasterIngredientList listenerFromParent={this.handleIngredientChange} multi={true}/>
                    </div>

                    <button type="submit" className="btn btn-primary"> Submit</button>
                </form>
                <form onSubmit={this.handleAddStep}>
                    <label htmlFor="recipeSteps"> Steps </label>
                    <div id='recipeSteps' className="input-group">
                        <input type="text" className="form-control" value={this.state.newStep}
                               onChange={this.handleStepChange}/>
                        <span className="input-group-addon btn" onClick={this.handleAddStep}>+</span>
                    </div>
                </form>
                <h2>Recipe Preview</h2>
                <RecipeTemplate title={this.state.recipeTitle} ingredients={this.state.ingredientList}
                                steps={this.state.steps} description={this.state.description}/>
            </div>

        )
    },
    handleSubmit: function (e) {
        var firebaseRef = firebase.database().ref('recipes');
        e.preventDefault();
        firebaseRef.push({
            title: this.state.Title
        });
        this.setState({ingredientName: ""});
    }
});

module.exports = RecipeAdder;