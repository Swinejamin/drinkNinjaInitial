import React from 'react';
import TextField from 'material-ui/TextField';
import TagListBuilder from '../TagListBuilder';

const IngredientAdder = React.createClass({
    propTypes: {
        add: React.PropTypes.func.isRequired,
        remove: React.PropTypes.func.isRequired,
        ingredientSource: React.PropTypes.object.isRequired,
        masterIngredients: React.PropTypes.object.isRequired
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
        this.props.add('ingredients', {name: this.state.ingredientName});
        this.setState({
            ingredientName: ''
        });
    },
    handleDelete(tag) {
        this.props.remove('ingredients', tag);
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
                </form>
                <TagListBuilder listSource={this.props.ingredientSource}
                                remove={this.handleDelete} loading={this.props.loadingIngredients} masterList={this.props.masterIngredients}
                />
            </div>
        );
    }
});

export default IngredientAdder;
