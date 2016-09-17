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
    },
    componentWillUnmount() {
        base.removeBinding(this.ingredients);

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
            <div className="view-wrapper">
                <Paper className="console-paper">
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Add ingredients, tags, or units to the master list"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <Tabs>
                        <Tab label="Ingredient">
                            <IngredientAdder ingredientSource={this.props.masterIngredients}
                                             addIngredient={this.handleAdd}
                                             removeIngredient={this.handleDelete} listHeader="Master ingredient list"/>
                        </Tab>
                        <Tab label="Tag">
                            <TagAdder tagSource={this.props.tags} addTag={this.handleAdd}
                                      removeTag={this.handleDelete} listHeader="Master tag list"/>
                        </Tab>
                        <Tab label="Unit">
                            <UnitAdder unitSource={this.props.units} addUnit={this.handleAdd}
                                       removeUnit={this.handleDelete} listHeader="Master unit list"/>
                        </Tab>
                    </Tabs>
                </Paper>

                <div className="console-paper">
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Add a recipe to the database"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <RecipeAdder addRecipe={this.handleAdd} masterIngredientList={this.props.masterIngredients}
                                 masterTagList={this.props.tags} masterUnitList={this.props.units}/>
                </div>
            </div>
        );
    }
});

export default Console;
