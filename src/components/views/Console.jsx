"use strict";

import React from 'react';
import base from '../../modules/rebase';
import RecipeAdder from '../editors/RecipeAdder.jsx';
import IngredientAdder from '../editors/IngredientAdder.jsx';
import TagAdder from '../editors/TagAdder.jsx';
import UnitAdder from '../editors/UnitAdder.jsx';

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
                            <TagAdder tagSource={this.props.masterTags} addTag={this.handleAdd}
                                      removeTag={this.handleDelete} listHeader="Master tag list"/>
                        </Tab>
                        <Tab label="Unit">
                            <UnitAdder unitSource={this.props.masterUnits} addUnit={this.handleAdd}
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
                                 masterTagList={this.props.masterTags} masterUnitList={this.props.masterUnits}/>
                </div>
            </div>
        );
    }
});

export default Console;
