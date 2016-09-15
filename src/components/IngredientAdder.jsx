import React from 'react';
import base from '../modules/rebase';
import auth from '../modules/auth';

const IngredientAdder = React.createClass({
    getInitialState() {
        return {
            ingredientName: '',
            ingredientType: 'Alcohol'
        };
    },

    handleNameChange(e) {
        this.setState({ingredientName: e.target.value});
    },


    handleTypeChange(e) {
        this.setState({ingredientType: e.target.value});
    },

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="ingredientType"> Ingredient Type </label>
                    <select id="ingredientType" className="form-control" value={this.state.ingredientType}
                            onChange={this.handleTypeChange}>
                        <option>Alcohol</option>
                        <option>Mixer</option>
                        <option>Garnish</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ingredientName"> Ingredient Name </label>
                    <input type="text" id='ingredientName' className="form-control" rows="1"
                           value={this.state.ingredientName} onChange={this.handleNameChange}/>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        )
    },

    handleSubmit(e) {
        const ref = `ingredients`;
        e.preventDefault();
        base.database().ref(ref).push({
            ingredientName: this.state.ingredientName,
            ingredientType: this.state.ingredientType
        });
        this.setState({ingredientName: ''});
    }
});

export default IngredientAdder;