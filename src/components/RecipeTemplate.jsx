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
        removeItem: React.PropTypes.func,
        editing: React.PropTypes.bool.isRequired
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
        let emptyTitle = true;
        const ingredients = this.props.ingredients;
        const steps = this.props.steps;
        const title = this.props.title;
        const editing = this.props.editing;
        if (ingredients.length > 0) {
            emptyIngredients = false;
        }
        if (steps.length > 0) {
            emptySteps = false;
        }
        if (title.length > 0) {
            emptyTitle = false;
        }
        return (
            <Paper itemScope itemType="http://schema.org/Recipe">
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={(emptyTitle ?
                            () => {
                                return 'Sample title';
                            } :
                            () => {
                                return this.props.title;
                            })()}/>
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
                                                            type={'ingredient'}
                                                            ignore={true}
                                                            editing={editing}/>
                                        );
                                    } :
                                    () => {
                                        return (
                                            ingredients.map((ingredient, index) => {
                                                return (
                                                    <RecipeListItem key={index} index={index}
                                                                    removeItem={this.handleRemoveIngredient}
                                                                    content={ingredient}
                                                                    type={'ingredient'}
                                                                    ignore={false}
                                                                    editing={editing}/>
                                                );
                                            })
                                        );
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
                                            <RecipeListItem key={fake.key} index={0}
                                                            removeItem={this.handleRemoveStep}
                                                            content={fake}
                                                            type={'step'} ignore={true}
                                                            editing={editing}/>
                                        );
                                    } :
                                    () => {
                                        return (
                                            steps.map((step, index) => {
                                                return (
                                                    <RecipeListItem key={index} index={index}
                                                                    content={step}
                                                                    ignore={false}
                                                                    removeItem={this.handleRemoveStep}
                                                                    type={'step'}
                                                                    editing={editing}/>
                                                );
                                            })
                                        );
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
