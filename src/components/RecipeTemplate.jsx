import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import RecipeListItem from './RecipeListItem';

const RecipeTemplate = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        ingredients: React.PropTypes.array.isRequired,
        steps: React.PropTypes.array.isRequired,
        description: React.PropTypes.string.isRequired,
        removeItem: React.PropTypes.func.isRequired,
        // removeStep: React.PropTypes.func.isRequired,
    },
    handleRemoveIngredient(index) {
        this.props.removeItem('ingredients', index);
    },
    handleRemoveStep(index) {
        this.props.removeItem('steps', index);
    },
    render() {
        let emptyIngredients = true;
        let emptySteps = true;
        const ingredients = this.props.ingredients;
        const steps = this.props.steps;
        if (ingredients.length > 0) {
            emptyIngredients = false;
        }
        if (steps.length > 0) {
            emptySteps = false;
        }
        return (
            <Paper itemScope itemType="http://schema.org/Recipe">
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={this.props.title}/>
                    </ToolbarGroup>
                </Toolbar>
                <Tabs>
                    <Tab label="Ingredients">
                        <List>
                            {(emptyIngredients ?
                                    () => {
                                        const fake = {
                                            name: 'Ingredient 1',
                                            key: 0,
                                            amount: 1,
                                            unit: {
                                                name: 'oz',
                                                key: 0
                                            }
                                        };
                                        return (
                                            <RecipeListItem key={fake.key} index={0}
                                                            removeItem={this.handleRemoveIngredient}
                                                            content={fake}
                                                            type={'ingredient'}/>
                                        );
                                    } :
                                    () => {
                                        ingredients.map((ingredient, index) => {
                                            return (
                                                <RecipeListItem key={index} index={index}
                                                                removeItem={this.handleRemoveIngredient}
                                                                content={ingredient}
                                                                type={'ingredient'}/>
                                            );
                                        });
                                    }
                            )()}
                        </List>
                    </Tab>
                    <Tab label="steps">
                        <List>
                            {(emptySteps ?
                                    () => {
                                        const fake = {
                                            text: 'Step 1',
                                            key: 0,
                                        };
                                        return (
                                            <RecipeListItem key={fake.key} index={999999}
                                                            removeItem={this.handleRemoveStep}
                                                            content={fake}
                                                            type={'step'}/>
                                        );
                                    } :
                                    () => {
                                        steps.map((step, index) => {
                                            console.log(step, index);
                                            return (
                                                <RecipeListItem key={index} index={index}
                                                                content={step}
                                                                removeItem={this.handleRemoveStep}
                                                                type={'step'}/>
                                            );
                                        });
                                    }
                            )()}
                        </List>
                    </Tab>
                </Tabs>
            </Paper>
        );
    }
});

export default RecipeTemplate;
