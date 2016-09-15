import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

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
        return (
            <Card className="Card" itemScope itemType="http://schema.org/Recipe">
                <CardHeader
                    title={this.props.title}
                    subtitle={this.props.description}
                />
                <CardText>
                    <List>
                        {this.props.ingredients.map((ingredient, index) => {
                            return (
                                <RecipeListItem key={index} index={index} ingredient={ingredient} removeItem={this.handleRemoveIngredient}/>
                            );
                        })}
                    </List>
                </CardText>
                <ul itemProp="recipeInstructions" className="list-group list-group-flush">
                    {this.props.steps.map((step, index) => {
                        return (
                            <li key={index} className="list-group-item">{step.text} </li>
                        );
                    })}
                </ul>
            </Card>
        );
    }
});

export default RecipeTemplate;
