"use strict";

import React from 'react';
import base from '../modules/rebase';
import ReactDOM from 'react-dom';
import RecipeAdder from './RecipeAdder.jsx';
import IngredientAdder from './IngredientAdder.jsx';
import TagAdder from './TagAdder.jsx';
import UnitAdder from './UnitAdder.jsx';

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const Console = React.createClass({

    render() {
        return (
            <Paper>
                <Card>
                    <CardHeader title='Add ingredients, tags, or units to the master list'/>
                    <CardText>
                        <IngredientAdder/>
                    </CardText>
                    <CardText>
                        <TagAdder/>
                    </CardText>
                    <CardText>
                        <UnitAdder/>
                    </CardText>
                </Card>
                <Card>
                    <CardHeader title='Add a recipe to the database'/>
                    <CardText>
                        <RecipeAdder/>
                    </CardText>
                </Card>
            </Paper>
        );
    }
});

export default Console;
