"use strict";

import React from 'react';
import base from '../../modules/rebase';
import RecipeAdder from '../editors/RecipeAdder.jsx';
import IngredientAdder from '../editors/IngredientAdder.jsx';
import TagAdder from '../editors/TagAdder.jsx';
import UnitAdder from '../editors/UnitAdder.jsx';


import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';

const Suggestions = React.createClass({
    getInitialState() {
        return {
            open: false,
            ingredients: {},
            tags: {},
            units: {},
            errorMessage: 'Sorry, only Admins can do that!'
        };
    },
    componentWillMount() {
        const ingredientsRef = 'suggestions/ingredients';
        const unitsRef = 'suggestions/units';
        const tagsRef = 'suggestions/tags';
        this.ingredients = base.bindToState(ingredientsRef, {
            context: this,
            state: 'ingredients',
            asArray: false,
        });
        this.units = base.bindToState(unitsRef, {
            context: this,
            state: 'units',
            asArray: false,
        });
        this.tags = base.bindToState(tagsRef, {
            context: this,
            state: 'tags',
            asArray: false,
        });
    },
    componentWillUnmount() {
        base.removeBinding(this.ingredients);
        base.removeBinding(this.units);
        base.removeBinding(this.tags);
    },
    handleAdd(type, value) {
        const target = base.database().ref(`suggestions/${type}`);
        target.push(value);
    },
    handleDelete(type, ref) {

        const target = base.database().ref(`suggestions/${type}/${ref.key}`);
        target.remove().catch((error) => {
            this.setState({
                erorMessage: error,
                open: true
            });
        });

    },
    handleRequestClose() {
        this.setState({
            open: false,
        });
    },
    render() {
        return (
            <div className="view-wrapper">
                <div className="console-paper">
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Notice something missing? Make a suggestion!"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <Tabs>
                        <Tab label="Ingredient">
                            <IngredientAdder ingredientSource={this.state.ingredients}
                                             addIngredient={this.handleAdd}
                                             removeIngredient={this.handleDelete}
                                             listHeader="Pending ingredient suggestions"/>
                        </Tab>
                        <Tab label="Tag">
                            <TagAdder tagSource={this.state.tags} addTag={this.handleAdd}
                                      removeTag={this.handleDelete} listHeader="Pending tag suggestions"/>
                        </Tab>
                        <Tab label="Unit">
                            <UnitAdder unitSource={this.state.units} addUnit={this.handleAdd}
                                       removeUnit={this.handleDelete} listHeader="Pending unit suggestions"/>
                        </Tab>
                        <Tab label="Recipe">
                            <RecipeAdder addRecipe={this.handleAdd} masterIngredientList={this.props.masterIngredients}
                                         masterTagList={this.props.masterTags} masterUnitList={this.props.masterUnits}/>
                        </Tab>
                    </Tabs>
                    <Snackbar
                        open={this.state.open}
                        message={this.state.errorMessage}
                        autoHideDuration={2000}
                        onRequestClose={this.handleRequestClose}
                        onActionTouchTap={this.handleRequestClose}
                        action="hide"
                    />
                </div>
            </div>
        );
    }
});

export default Suggestions;
