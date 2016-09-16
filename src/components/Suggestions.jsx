"use strict";

import React from 'react';
import base from '../modules/rebase';
import RecipeAdder from './RecipeAdder.jsx';
import IngredientAdder from './IngredientAdder.jsx';
import TagAdder from './TagAdder.jsx';
import UnitAdder from './UnitAdder.jsx';


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
            units: {}
        };
    },
    componentWillMount() {
        const ingredientsRef = 'suggestions/ingredients';
        const unitsRef = 'suggestions/units';
        const tagsRef = 'suggestions/tags';
        base.bindToState(ingredientsRef, {
            context: this,
            state: 'ingredients',
            asArray: false,
        });
        base.bindToState(unitsRef, {
            context: this,
            state: 'units',
            asArray: false,
        });
        base.bindToState(tagsRef, {
            context: this,
            state: 'tags',
            asArray: false,
        });
    },
    handleAdd(type, value) {
        const target = base.database().ref(`suggestions/${type}`);
        target.push(value);
    },
    handleDelete(type, ref) {
        // const target = base.database().ref(`suggestions/${type}/${ref.key}`);
        // target.remove();
        this.setState({
            open: true
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
                <Paper className="console-paper">
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Notice something missing? Make a suggestion!"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <Tabs>
                        <Tab label="Ingredient">
                            <IngredientAdder ingredientSource={this.state.ingredients}
                                             addIngredient={this.handleAdd}
                                             removeIngredient={this.handleDelete} listHeader="Pending ingredient suggestions"/>
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
                            <RecipeAdder addRecipe={this.handleAdd} masterIngredientList={this.state.ingredients}
                                         masterTagList={this.state.tags} masterUnitList={this.state.units}/>
                        </Tab>
                    </Tabs>
                    <Snackbar
                        open={this.state.open}
                        message="Sorry, only Admins can do that!"
                        autoHideDuration={2000}
                        onRequestClose={this.handleRequestClose}
                        onActionTouchTap={this.handleRequestClose}
                        action="hide"
                    />
                </Paper>
            </div>
        );
    }
});

export default Suggestions;
