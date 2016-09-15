import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const RecipeTemplate = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        ingredients: React.PropTypes.array.isRequired,
        steps: React.PropTypes.array.isRequired,
        description: React.PropTypes.string.isRequired,
        removeIngredient: React.PropTypes.func.isRequired,
        removeStep: React.PropTypes.func.isRequired,
    },
    handleRemoveIngredient(ingredient){
        this.props.removeIngredient(ingredient);
    },
    render() {
        const removeIngredient = this.props.handleRemoveIngredient;
        const removeStep = this.props.removeStep;
        return (
            <Card className="Card" itemScope itemType="http://schema.org/Recipe">
                <CardHeader
                    title={this.props.title}
                    subtitle={this.props.description}
                />
                <CardText>
                    <List>
                        {this.props.ingredients.map(function(ingredient, index) {
                            return (
                                <ListItem key={index} itemProp="recipeIngredient"
                                          rightIconButton={
                                              <IconButton
                                                  touch={true}
                                                  tooltip="remove"
                                                  tooltipPosition="bottom-right"
                                                  onClick={removeIngredient}
                                              >
                                                  <ActionDelete />
                                              </IconButton>}>
                                    <span>{ingredient.amount} </span>
                                    <span>{ingredient.unit.name} </span>
                                    <span>{ingredient.name}</span>
                                </ListItem>
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
