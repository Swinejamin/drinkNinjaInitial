import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import RecipeListItem from './RecipeListItem';

const RecipeTemplate = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        ingredients: React.PropTypes.array.isRequired,
        steps: React.PropTypes.array.isRequired,
        description: React.PropTypes.string.isRequired,
        removeItem: React.PropTypes.func,
        editing: React.PropTypes.bool.isRequired,
        imgUrl: React.PropTypes.string,
        authorName: React.PropTypes.string,
        source: React.PropTypes.string
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
        let emptyDescription = true;
        const ingredients = this.props.ingredients;
        const steps = this.props.steps;
        const title = this.props.title;
        const description = this.props.description;
        const imgUrl = this.props.imgUrl;
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
        if (description.length > 0) {
            emptyDescription = false;
        }
        return (
            <Paper itemScope itemType="http://schema.org/Recipe">
                <Card style={{maxWidth: 800}}>
                    <CardHeader
                        title={(emptyTitle ?
                            () => {
                                return 'Sample title';
                            } :
                            () => {
                                return this.props.title;
                            })()}
                        subtitle={(emptyDescription ?
                            () => {
                                return 'Sample description';
                            } :
                            () => {
                                return this.props.description;
                            })()}
                    />
                    <CardMedia
                        overlay={<CardTitle title={this.props.authorName || 'Author unknown'} subtitle={this.props.authorName || 'Source unknown'} />}
                    >
                        <img src={imgUrl} />
                    </CardMedia>
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardText>
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
                    </CardText>
                    <CardActions>
                    </CardActions>
                </Card>
            </Paper>
        );
    }
});

export default RecipeTemplate;
