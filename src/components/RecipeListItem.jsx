import React from 'react';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const RecipeListItem = React.createClass({
    propTypes: {
        removeItem: React.PropTypes.func.isRequired,
        index: React.PropTypes.number.isRequired,
        type: React.PropTypes.string.isRequired,
        content: React.PropTypes.object.isRequired
    },
    handleRemoveItem(e) {
        e.preventDefault();
        this.props.removeItem(this.props.index);
    },
    render() {
        if (this.props.type === 'ingredient' && this.props.content.name) {

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
                    <span>{this.props.content.amount} </span>
                    <span>{this.props.content.unit.name} </span>
                    <span>{this.props.content.name}</span>
                </ListItem>
            );
        } else {
            return (
                <ListItem itemProp="recipeInstructions"
                          rightIconButton={
                              <IconButton
                                  touch={true}
                                  tooltip="remove"
                                  tooltipPosition="bottom-right"
                                  onClick={this.handleRemoveItem}
                              >
                                  <ActionDelete />
                              </IconButton>}>
                    <span>{this.props.content.text} </span>
                </ListItem>
            );
        }
    }
});

export default RecipeListItem;
