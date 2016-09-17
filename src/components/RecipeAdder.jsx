import React from 'react';
import update from 'react-addons-update';
import RecipeTemplate from './RecipeTemplate.jsx';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
            recipeTitle: 'Sample Title',
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
    //ingredients
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
            ingredientSearchText: {$set: ''},
            unitSearchText: {$set: ''},
            currentIngredient: {$set: {name: '', key: ''}},
            currentUnit: {$set: {name: '', key: ''}}
        });

        this.setState(newState);
    },
    handleIngredientChange(ingredient) {
        this.setState({currentIngredient: {name: ingredient.value, key: ingredient.key}});
    },
    handleUpdateIngredientSearch(t) {
        this.setState({ingredientSearchText: t});
    },
    //units
    handleUnitChange(unit) {
        this.setState({currentUnit: {name: unit.value, key: unit.key}});
    },
    handleUpdateUnitSearch(t) {
        this.setState({unitSearchText: t});
    },
    //amounts
    handleAmountChange(e) {
        this.setState({amount: e.target.value});
    },

    //steps
    handleStepChange(e) {
        this.setState({newStep: e.target.value});
    },
    handleNewStep(e) {
        const newState = update(this.state, {
            stepsList: {$push: [{text: this.state.newStep, key: Date.now()}]},
            newStep: {$set: ''}
        });
        this.setState(newState);
        e.preventDefault();
    },
    handleRemoveItem(type, index) {
        let target = '';
        let newState = '';

        if (type === 'ingredients') {
            target = this.state.ingredientList;
            let newData = target.slice(); //copy array
            newData.splice(index, 1); //remove element
            newState = update(this.state, {
                ingredientList: {$set: newData}
            });
        } else if (type === 'steps') {
            target = this.state.stepsList;
            let newData = target.slice(); //copy array
            newData.splice(index, 1); //remove element
            newState = update(this.state, {
                stepsList: {$set: newData}
            });
        }
        this.setState(newState); //update state
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
        const masterUnitList = _(this.props.masterUnitList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterUnitList[ingredientKey])};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value().sort(this.alphaByName);
        const masterIngredientList = _(this.props.masterIngredientList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterIngredientList[ingredientKey])};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value().sort(this.alphaByName);
        return (
            <div>
                <Paper className="console-adders">
                    <form onSubmit={this.handleSubmit}>
                        <TextField fullWidth={true}
                                   hintText="Hair of the Three-Headed Dog"
                                   type="text"
                                   floatingLabelText="Recipe Title"
                                   value={this.state.recipeTitle}
                                   onChange={this.handleTitleChange}/>
                        <div className="ingredient-adder-box">
                            <div className="ingredient-details">
                                <TextField fullWidth={false}
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
                                    onUpdateInput={this.handleUpdateUnitSearch}
                                />
                                <br/>
                                <div>
                                    <AutoComplete
                                        className="ingredient-name"
                                        hintText='Ingredient'
                                        dataSource={masterIngredientList}
                                        dataSourceConfig={dataSourceConfig}
                                        searchText={this.state.ingredientSearchText}
                                        filter={AutoComplete.fuzzyFilter}
                                        onNewRequest={this.handleIngredientChange}
                                        onUpdateInput={this.handleUpdateIngredientSearch}
                                    />
                                    <FlatButton className="ingredient-submit-button" label="Add Ingredient"
                                                onClick={this.handleNewItem}
                                                disabled={this.state.amount === '' ||
                                                this.state.currentIngredient.key === '' ||
                                                this.state.currentIngredient.name === '' ||
                                                this.state.currentUnit.key === '' ||
                                                this.state.currentUnit.name === ''}/>
                                </div>
                            </div>

                        </div>
                        <div className="step-wrapper">
                            <TextField className="step-text" fullWidth={false}
                                       hintText="Add a step"
                                       type="text"
                                       value={this.state.newStep}
                                       onChange={this.handleStepChange}/>
                            <FlatButton className="step-button"
                                        onClick={this.handleNewStep}
                                        disabled={this.state.newStep === '' }>
                                <ContentAdd />
                            </FlatButton>
                        </div>
                    </form>
                </Paper>
                <h2>Recipe Preview</h2>
                <RecipeTemplate title={this.state.recipeTitle} ingredients={this.state.ingredientList}
                                steps={this.state.stepsList} description={this.state.description}
                                removeItem={this.handleRemoveItem}/>
            </div>
        );
    }
});

export default RecipeAdder;