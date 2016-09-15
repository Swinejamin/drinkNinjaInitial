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
            unitSearchText: '',
            ingredientSearchText: '',
            recipeTitle: '',
            stepsList: [],
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
    handleNewItem(value) {
        const name = this.state.currentIngredient.name;
        const key = this.state.currentIngredient.key;
        const amount = this.state.amount;
        const unit = this.state.currentUnit;
        const newState = update(this.state, {
            ingredientList: {
                $push: [{
                    name: name,
                    key: key,
                    amount: amount,
                    unit: {
                        name: unit.name,
                        key: unit.key
                    }
                }]
            },
            amount: {$set: ''},
            ingredientSearchText:  {$set: ''},
            unitSearchText:  {$set: ''},
            currentIngredient: {$set: {name: '', key: ''}},
            currentUnit: {$set: {name: '', key: ''}}
        });

        this.setState(newState);
    },
    handleRemoveItem(type, index) {
        console.log(index);
        let target = '';

        if (type === 'ingredients') {
            target = this.state.ingredientList;
        } else if (type === 'steps') {
            target = this.state.stepsList;
        }
        let newData = target.slice(); //copy array
        newData.splice(index, 1); //remove element
        this.setState({ingredientList: newData}); //update state
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
    handleNewStep(e) {
        const newState = update(this.state, {
            stepsList: {$push: [{text: this.state.newStep, key: Date.now()}]},
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
                            searchText={this.state.unitSearchText}
                            filter={AutoComplete.fuzzyFilter}
                            onNewRequest={this.handleUnitChange}
                            onUpdateInput={this.handleUpdateInput}
                        />
                        <br/>
                        <IngredientFinder id="IngredientFinder" masterList={this.props.masterIngredientList}
                                          userList={this.state.ingredients}
                                          addIngredient={this.handleIngredientChange}
                                          searchText={this.state.ingredientSearchText}
                                          searchHintText="Ingredient"/>
                        <FlatButton className="ingredient-submit-button" label="Add Ingredient"
                                    onClick={this.handleNewItem}/>
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
                                steps={this.state.stepsList} description={this.state.description}
                                removeItem={this.handleRemoveItem}/>
            </div>
        );
    }
});

export default RecipeAdder;