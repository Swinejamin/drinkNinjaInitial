"use strict";

import React from 'react';
import base from '../modules/rebase';
import RecipeAdder from './RecipeAdder.jsx';
import IngredientAdder from './IngredientAdder.jsx';
import TagAdder from './TagAdder.jsx';
import UnitAdder from './UnitAdder.jsx';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';

const Console = React.createClass({
    getInitialState() {
        return {
            ingredients: {},
            tags: {},
            units: {}
        };
    },
    componentWillMount() {
        const ingredientsRef = 'ingredients';
        const unitsRef = 'units';
        const tagsRef = 'tags';
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
        const target = base.database().ref(`${type}`);
        target.push(value);
    },
    handleDelete(type, ref) {
        const target = base.database().ref(`${type}/${ref.key}`);
        target.remove();
    },
    render() {
        return (
            <div className="console-wrapper">
                <Paper className="console-paper">
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Add ingredients, tags, or units to the master list"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <Tabs>
                        <Tab label="Ingredient">
                            <IngredientAdder ingredientSource={this.state.ingredients}
                                             addIngredient={this.handleAdd}
                                             removeIngredient={this.handleDelete}/>
                        </Tab>
                        <Tab label="Tag">
                            <TagAdder tagSource={this.state.tags} addTag={this.handleAdd}
                                      removeTag={this.handleDelete}/>
                        </Tab>
                        <Tab label="Unit">
                            <UnitAdder unitSource={this.state.units} addUnit={this.handleAdd}
                                       removeUnit={this.handleDelete}/>
                        </Tab>
                    </Tabs>
                </Paper>

                <Paper>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Add a recipe to the database"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <RecipeAdder addRecipe={this.handleAdd} masterIngredientList={this.state.ingredients}
                                 masterTagList={this.state.tags} masterUnitList={this.state.units}/>
                </Paper>
            </div>
        );
    }
});

export default Console;
