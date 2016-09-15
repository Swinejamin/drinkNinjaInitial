"use strict";

import React from 'react';
import base from '../modules/rebase';
import RecipeAdder from './RecipeAdder.jsx';
import IngredientAdder from './IngredientAdder.jsx';
import TagAdder from './TagAdder.jsx';
import UnitAdder from './UnitAdder.jsx';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const Console = React.createClass({

    render() {
        return (
            <div className="console-wrapper">
                <Paper >
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Add ingredients, tags, or units to the master list"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <IngredientAdder/>
                    <TagAdder/>
                    <UnitAdder/>
                </Paper>

                <Paper>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Add a recipe to the database"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <RecipeAdder/>
                </Paper>
            </div>
        );
    }
});

export default Console;
