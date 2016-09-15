import React from 'react';
import base from '../modules/rebase';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TagListBuilder from './TagListBuilder';


const IngredientAdder = React.createClass({
    propTypes: {
        addIngredient: React.PropTypes.func.isRequired,
        removeIngredient: React.PropTypes.func.isRequired,
        ingredientSource: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            ingredientName: ''
            // ingredientType: 'Alcohol'
        };
    },

    handleNameChange(e) {
        this.setState({ingredientName: e.target.value});
    },


    handleTypeChange(event, index, value) {
        this.setState({ingredientType: value});
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.addIngredient('ingredients', this.state.ingredientName);
        this.setState({
            ingredientName: ''
        });
    },
    handleDelete(tag) {
        this.props.removeIngredient('ingredients', tag);
    },
    render() {
        return (
            <div className="console-adders">
                <form onSubmit={this.handleSubmit}>
                    <TextField fullWidth={true}
                               hintText="Gin, Vodka, Rum..."
                               type="text"
                               floatingLabelText="Ingredient Name"
                               value={this.state.ingredientName}
                               onChange={this.handleNameChange}/>
                    <FlatButton label="Add ingredient" onClick={this.handleSubmit}/>
                </form>
                <TagListBuilder listSource={this.props.ingredientSource} removeTag={this.handleDelete}/>
            </div>
        );
    }
});

export default IngredientAdder;
