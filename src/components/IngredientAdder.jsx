import React from 'react';

class IngredientAdder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredientName: '',
            ingredientType: 'Alcohol'
        }
    }

    handleNameChange(e) {
        this.setState({ingredientName: e.target.value});
    }


    handleTypeChange(e) {
        this.setState({ingredientType: e.target.value});
    }

    componentWillMount() {
        this.firebaseRef = firebase.database().ref("ingredients");
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="ingredientType"> Ingredient Type </label>
                    <select id="ingredientType" className="form-control" value={this.state.ingredientType}
                            onChange={this.handleTypeChange}>
                        <option>Alcohol</option>
                        <option>Mixer</option>
                        <option>Garnish</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor="ingredientName"> Ingredient Name </label>
                    <input type="text" id='ingredientName' className="form-control" rows="1"
                           value={this.state.ingredientName} onChange={this.handleNameChange}/>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        )
    }

    handleSubmit(e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.firebaseRef.push({
            ingredientName: this.state.ingredientName,
            ingredientType: this.state.ingredientType
        });
        this.setState({ingredientName: ""});
    }
}

export default IngredientAdder;


module.exports = IngredientAdder;