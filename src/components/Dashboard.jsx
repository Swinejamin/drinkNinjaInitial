import React from 'react';
import IngredientFinder from './IngredientFinder.jsx';
import TagListBuilder from './TagListBuilder.jsx';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import base from '../modules/rebase';

const Dashboard = React.createClass({
    getInitialState() {
        return {
            user: {},
            ingredients: {},
            masterIngredients: {},
            loading: 'loading',

        };
    },

    componentWillMount() {
        base.onAuth((authData) => {
            if (authData) {
                // console.log(`User ${authData.uid} is logged in with ${authData.providerData ? authData.providerData[0].providerId : 'anonProvider'}`);
                this.uid = base.auth().currentUser.uid;
                this.user = base.bindToState(`users/${this.uid}`, {
                    context: this,
                    state: 'user',
                    asArray: false,
                });
                this.ingredients = base.bindToState(`users/${this.uid}/ingredients`, {
                    context: this,
                    state: 'ingredients',
                    asArray: false,
                    then() {
                        this.setState({loading: 'hide'});
                    }
                });
                this.masterIngredients = base.bindToState('ingredients', {
                    context: this,
                    state: 'masterIngredients',
                    asArray: false
                });
            } else {
                console.log("User is logged out");
            }
        });
    },

    componentDidMount() {
    },

    componentWillUnmount() {
        if (this.user) {
            base.removeBinding(this.user);
        }
        if (this.masterIngredients) {
            base.removeBinding(this.masterIngredients);
        }
        if (this.ingredients) {
            base.removeBinding(this.ingredients);
        }
    },

    handleAddIngredient(newIngredient) {
        const key = newIngredient.key;
        const data = {};
        data[key] = newIngredient.value;
        base.update(`users/${this.uid}/ingredients`, {
                data: data
            }
        )
        ;
    },

    removeTag(tag) {
        const targetStr = `users/${this.uid}/ingredients/${tag.key}`;
        const target = base.database().ref(targetStr);
        target.remove();
    },
    render() {
        return (
            <div className="view-wrapper">
                <div className="console-paper">
                    <div>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="Your cabinet"/>
                            </ToolbarGroup>
                        </Toolbar>
                        {this.state.loading !== 'loading' ? (

                            <IngredientFinder id="IngredientFinder" masterList={this.state.masterIngredients}
                                              userList={this.state.ingredients}
                                              addIngredient={this.handleAddIngredient}
                                              searchHintText="Add ingredients to your cabinet"
                                              listHeader='Your current ingredients'
                                              ingredientSource={this.state.ingredients}
                                              removeIngredient={this.removeTag}/>
                        ) : (<RefreshIndicator status={this.state.loading}
                                               left={50}
                                               top={50}/>)}
                    </div>
                    <div>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="Your cabinet"/>
                            </ToolbarGroup>
                        </Toolbar>
                        {this.state.loading !== 'loading' ? (

                            <IngredientFinder id="IngredientFinder" masterList={this.state.masterIngredients}
                                              userList={this.state.ingredients}
                                              addIngredient={this.handleAddIngredient}
                                              searchHintText="Add ingredients to your cabinet"
                                              listHeader='Your current ingredients'
                                              ingredientSource={this.state.ingredients}
                                              removeIngredient={this.removeTag}/>
                        ) : (<RefreshIndicator status={this.state.loading}
                                               left={50}
                                               top={50}/>)}
                    </div>


                </div>
            </div>
        );
    }
});

export default Dashboard;


