/*global React ReactDOM document firebase*/

(function () {
    "use strict";

    var IngredientAdder = React.createClass({
        getInitialState: function () {
            return {ingredientName: '', ingredientType: 'Alcohol'};
        },
        handleNameChange: function (e) {
            this.setState({ingredientName: e.target.value});
        },
        handleTypeChange: function (e) {
            this.setState({ingredientType: e.target.value});
        },
        componentWillMount: function () {
            this.firebaseRef = firebase.database().ref("ingredients");
        }, render: function () {
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
        },
        mixins: [ReactFireMixin],
        handleSubmit: function (e) {
            e.preventDefault();
            this.firebaseRef.push({
                ingredientName: this.state.ingredientName,
                ingredientType: this.state.ingredientType
            });
            this.setState({text: ""});
        }
    });
    var IngredientList = React.createClass({
        componentWillMount: function () {
            this.firebaseRef = firebase.database().ref("ingredients");
            this.firebaseRef.on("child_added", function (dataSnapshot) {
                this.ingredients.push(dataSnapshot.val());
                this.setState({
                    ingredients: this.ingredients
                });
            }.bind(this));
        },
        render: function () {
            return <div>{this.ingredients}</div>
        }
    });

    ReactDOM.render(<IngredientAdder />, document.getElementById("ingredientAdder"));
    ReactDOM.render(<IngredientList />, document.getElementById("ingredientList"));

}());
