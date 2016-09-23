import React from 'react';
import IngredientFinder from '../ingredients/IngredientFinder';
import RecipeBrowser from '../recipes/RecipeBrowser';
import TagListBuilder from '../TagListBuilder';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import _ from 'lodash';
import update from 'react-addons-update';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import CircularProgress from 'material-ui/CircularProgress';

import base from '../../modules/rebase';

const Dashboard = React.createClass({
    propTypes: {
        // ingredients: React.PropTypes.object.isRequired,
        // masterIngredients: React.PropTypes.object.isRequired,
        // user: React.PropTypes.object.isRequired,
        // uid: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            user: {},
            ingredients: {},
            masterIngredients: {},
            loading: 'loading',
            recipes: {},
            featuredTags: []
        };
    },

    componentWillMount() {
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },
    clickIngredient(ingredient) {
        const target = base.database().ref(`users/${this.props.uid}/ingredients/${ingredient.key}/isFeatured`);
        target.set(!ingredient.value.isFeatured);
        console.log(ingredient);
    },
    handleAddIngredient(newIngredient) {
        console.log(newIngredient)
        const key = newIngredient.key;
        const data = {};
        data[key['name']] = newIngredient.value;
        base.update(`users/${this.props.uid}/ingredients/${key}`, {
                data: {
                    'name': newIngredient.value
                }
            }
        )
        ;
    },

    removeTag(tag) {
        const targetStr = `users/${this.props.uid}/ingredients/${tag.key}`;
        const target = base.database().ref(targetStr);
        target.remove();
    },
    render() {
        const recipeList = _(this.props.recipes)
            .keys()
            .map((recipeKey) => {
                const cloned = {'value': _.clone(this.props.recipes[recipeKey])};
                cloned.key = recipeKey;
                return cloned;
            })
            .value();
        const ingredients = this.props.ingredients;

        function checkForIngredient(ing) {
            return ingredients[ing.ingredient];
        }

        // debugger;
        const filteredRecipes = recipeList.filter((recipe) => {
            return recipe.value.ingredientList.every(checkForIngredient);
        });
        const finalRecipes = _.chain(filteredRecipes)
            .keyBy('key')
            .mapValues('value')
            .value();
        return (
            <div className="view-wrapper">
                <div className="console-paper">
                    <div>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="Your cabinet"/>
                            </ToolbarGroup>
                        </Toolbar>
                        {this.props.loading !== 'loading' ? (

                            <IngredientFinder id="IngredientFinder" masterList={this.props.masterIngredients}
                                              userList={this.props.ingredients}
                                              addIngredient={this.handleAddIngredient}
                                              searchHintText="Add ingredients to your cabinet"
                                              listHeader='Your current ingredients'
                                              ingredientSource={this.props.ingredients}
                                              click={this.clickIngredient}
                                              remove={this.removeTag}/>
                        ) : (<CircularProgress size={5}/>)}
                    </div>
                    <div>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="Available recipes"/>
                            </ToolbarGroup>
                        </Toolbar>
                        {this.props.loading !== 'loading' ? (

                            <RecipeBrowser recipes={finalRecipes} featured={this.state.featuredTags}/>
                        ) : (<CircularProgress size={5}/>)}
                    </div>


                </div>
            </div>
        );
    }
});

export default Dashboard;


