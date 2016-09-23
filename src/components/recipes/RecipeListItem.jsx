import React from 'react';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const RecipeListItem = React.createClass({
    propTypes: {
        removeItem: React.PropTypes.func.isRequired,
        index: React.PropTypes.number.isRequired,
        type: React.PropTypes.string.isRequired,
        content: React.PropTypes.object.isRequired,
        ignore: React.PropTypes.bool.isRequired,
        editing: React.PropTypes.bool.isRequired,
        masterIngredients: React.PropTypes.object.isRequired,
        masterTags: React.PropTypes.object.isRequired,
        masterUnits: React.PropTypes.object.isRequired,
    },
    handleRemoveItem(e) {
        e.preventDefault();
        this.props.removeItem(this.props.index);
    },
    render() {
        const disabled = this.props.ignore;
        const editing = this.props.editing;
        if (this.props.type === 'ingredient') {
            const unit = this.props.content.unit;
            const ingredient = this.props.content.ingredient;
            // debugger;
            return (
                <ListItem itemProp="recipeIngredient"
                          rightIconButton={ (editing ?
                                  () => (
                                      <IconButton
                                          touch={true}
                                          tooltip="remove"
                                          tooltipPosition="bottom-right"
                                          onClick={this.handleRemoveItem}
                                          disabled={disabled}
                                      >
                                          <ActionDelete />
                                      </IconButton>
                                  ) :
                                  () => {
                                      return;
                                  }
                          )()}>
                    <span>{this.props.content.amount} </span>
                    <span>{this.props.content.amount > 1 ? this.props.masterUnits[unit].plural : this.props.masterUnits[unit].single} </span>
                    <span>{this.props.masterIngredients[ingredient]}</span>
                </ListItem> );
        } else {
            return (
                <ListItem itemProp="recipeInstructions"
                          rightIconButton={
                              <IconButton
                                  touch={true}
                                  tooltip="remove"
                                  tooltipPosition="bottom-right"
                                  onClick={this.handleRemoveItem}
                                  disabled={disabled}
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
