import React from 'react';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const RecipeListItem = React.createClass({
    propTypes: {
        removeItem: React.PropTypes.func.isRequired,
        index: React.PropTypes.number.isRequired,
        ingredient: React.PropTypes.object.isRequired
    },
    handleRemoveItem(e) {
        e.preventDefault();
        this.props.removeItem(this.props.index);
    },
    render() {
        return (
            <ListItem itemProp="recipeIngredient"
                      rightIconButton={
                          <IconButton
                              touch={true}
                              tooltip="remove"
                              tooltipPosition="bottom-right"
                              onClick={this.handleRemoveItem}
                          >
                              <ActionDelete />
                          </IconButton>}>
                <span>{this.props.ingredient.amount} </span>
                <span>{this.props.ingredient.unit.name} </span>
                <span>{this.props.ingredient.name}</span>
            </ListItem>
        );
    }
});

export default RecipeListItem;
