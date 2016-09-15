import React from 'react';
import update from 'react-addons-update';
import RecipeTemplate from './RecipeTemplate.jsx';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import IngredientFinder from './IngredientFinder.jsx';


const dataSourceConfig = {
    text: 'value',
    value: 'key',
};

const RecipeAdder = React.createClass({
    propTypes: {
        masterIngredientList: React.PropTypes.object.isRequired,
        masterTagList: React.PropTypes.object.isRequired,
        masterUnitList: React.PropTypes.object.isRequired,
        addRecipe: React.PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            searchText: '',
            recipeTitle: '',
            steps: [],
            newStep: '',
            ingredientList: [],
            tagList: {},
            unitList: {},
            amount: '',
            unit: '',
            currentIngredient: {name: '', key: ''},
            currentUnit: {name: '', key: ''},
            description: '',
            ingredients: {},
        };
    },
    handleTitleChange(e) {
        this.setState({recipeTitle: e.target.value});
    },
    handleStepChange(e) {
        this.setState({newStep: e.target.value});
    },
    handleNewIngredient(value) {
        console.log(value);
        const newState = update(this.state, {
            ingredientList: {
                $push: [{
                    name: this.state.currentIngredient.name,
                    key: this.state.currentIngredient.key,
                    amount: this.state.amount,
                    unit: {
                        name: this.state.currentUnit.name,
                        key: this.state.currentUnit.key
                    }
                }]
            },
        });
        this.setState(newState);
    },
    handleRemoveIngredient(value){
        console.log(value);
        const newState = update(this.state, {
            ingredientList: {
                $push: [{
                    name: this.state.currentIngredient.name,
                    key: this.state.currentIngredient.key,
                    amount: this.state.amount,
                    unit: {
                        name: this.state.currentUnit.name,
                        key: this.state.currentUnit.key
                    }
                }]
            },
        });
        // this.setState(newState);

    },
    handleIngredientChange(value) {
        this.setState({currentIngredient: {name: value.value, key: value.key}});
    },
    handleUnitChange(ingredient) {
        this.setState({currentUnit: {name: ingredient.value, key: ingredient.key}});
    },
    handleAmountChange(e) {
        this.setState({amount: e.target.value});
    },
    handleAddStep(e) {
        const newState = update(this.state, {
            steps: {$push: [{text: this.state.newStep, key: Date.now()}]},
            newStep: {$set: ''}
        });
        this.setState(newState);
        e.preventDefault();
    },
    handleDeleteStep(ind, e) {
        e.preventDefault();

        const newState = update(this.state, {
            steps: {$splice: [[ind, 1]]}
        });
        this.setState(newState);
    },
    handleUpdateInput(t) {
        this.setState({searchText: t});
    },
    alphaByName(a, b) {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    },

    handleSubmit(e) {
        var firebaseRef = firebase.database().ref('recipes');
        e.preventDefault();
        firebaseRef.push({
            title: this.state.Title
        });
        this.setState({ingredientName: ""});
    },
    render() {
        let masterUnitList = _(this.props.masterUnitList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterUnitList[ingredientKey])};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value().sort(this.alphaByName);
        let masterIngredientList = _(this.props.masterIngredientList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterIngredientList[ingredientKey])};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value().sort(this.alphaByName);
        return (
            <div className="console-adders">
                <form onSubmit={this.handleSubmit}>
                    <TextField fullWidth={true}
                               hintText="Hair of the Three-Headed Dog"
                               type="text"
                               floatingLabelText="Recipe Title"
                               value={this.state.recipeTitle}
                               onChange={this.handleTitleChange}/>
                    <Paper className="ingredient-adder-box">
                        <TextField fullWidth={true}
                                   className="ingredient-amount"
                                   hintText="Amount"
                                   type="number"
                                   value={this.state.amount}
                                   onChange={this.handleAmountChange}/>
                        <br/>
                        <AutoComplete
                            hintText='Unit'
                            dataSource={masterUnitList}
                            dataSourceConfig={dataSourceConfig}
                            searchText={this.state.searchText}
                            filter={AutoComplete.fuzzyFilter}
                            onNewRequest={this.handleUnitChange}
                            onUpdateInput={this.handleUpdateInput}
                        />
                        <br/>
                        <IngredientFinder id="IngredientFinder" masterList={this.props.masterIngredientList}
                                          userList={this.state.ingredients}
                                          addIngredient={this.handleIngredientChange}
                                          searchHintText="Ingredient"/>
                        <FlatButton className="ingredient-submit-button" label="Add Ingredient"
                                    onClick={this.handleNewIngredient}/>
                    </Paper>




                </form>
                <form className="form-inline" onSubmit={this.handleAddStep}>
                    <label htmlFor="recipeSteps"> Steps </label>
                    <div id='recipeSteps' className="input-group">
                        <input type="text" className="form-control" value={this.state.newStep}
                               onChange={this.handleStepChange}/>
                        <span className="input-group-addon btn" onClick={this.handleAddStep}>+</span>
                    </div>
                </form>
                <h2>Recipe Preview</h2>
                <RecipeTemplate title={this.state.recipeTitle} ingredients={this.state.ingredientList}
                                steps={this.state.steps} description={this.state.description} removeIngredient={this.handleRemoveIngredient}/>
            </div>
        );
    }
});

export default RecipeAdder;