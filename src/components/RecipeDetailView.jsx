import React from 'react';
import Paper from 'material-ui/Paper';
import RecipeTemplate from './RecipeTemplate';
import {Link} from 'react-router';
import base from '../modules/rebase';

const RecipeBrowser = React.createClass({
    propTypes: {},
    getInitialState() {
        return {
            recipe: {
                title: '',
                ingredientList: [],
                stepsList: [],
                image: {
                    url: '',
                    portrait: true
                }
            }
        };
    },
    componentWillMount() {
        console.log(this.props.params.key);

        const recipeRef = `recipes/${this.props.params.key}`;
        this.recipe = base.fetch(recipeRef, {
            context: this,
            asArray: false,
            then(data) {
                this.setState({
                    recipe: data
                });
            }
        });
    },
    render() {
        return (
            <div className="view-wrapper">
                <Paper className="console-paper">
                    <RecipeTemplate title={this.state.recipe.title}
                                    ingredients={this.state.recipe.ingredientList}
                                    steps={this.state.recipe.stepsList}
                                    description={this.state.recipe.description || ''}
                                    editing={false}
                                    imgUrl={this.state.recipe.image.url || ''}/>
                </Paper>
            </div>
        );
    }
});

export default RecipeBrowser;
