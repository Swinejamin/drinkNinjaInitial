/*global $ Bloodhound React ReactDOM document firebase*/

(function () {
    "use strict";
    var Select = require('react-select');

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
        handleSubmit: function (e) {
            // console.log(this.firebaseRef);
            e.preventDefault();
            this.firebaseRef.push({
                ingredientName: this.state.ingredientName,
                ingredientType: this.state.ingredientType
            });
            this.setState({ingredientName: ""});
        }
    });
    var IngredientList = React.createClass({
        getInitialState: function () {
            return {};
        },
        componentWillMount: function () {
            var ref = firebase.database().ref("ingredients");
            this.firebaseRef = ref;
            this.bindAsArray(ref, "ingredients");
        },
        render: function () {
            return (
                <div>
                    {this.state.ingredients.map(function (ingredient) {
                        return <IngredientTag content={ingredient.ingredientName}/>;
                    })}
                </div>
            );

        },
        mixins: [ReactFireMixin],
        componentWillUnmount: function () {
            this.firebaseRef.off();
        }
    });
    var IngredientTag = React.createClass({
        render: function () {
            return <button className="btn btn-primary">{this.props.content}</button>
        }
    });

    var RecipeAdder = React.createClass({
        getInitialState: function () {
            return {ingredients: [], Title: ''};
        },
        handleTitleChange: function (e) {
            this.setState({recipeTitle: e.target.value});
        },
        handleStepChange: function (e) {
            this.setState({recipeStep: e.target.value});
        },
        componentDidMount: function () {
            var ref = firebase.database().ref('ingredients');
            this.bindAsArray(ref, 'ingredients');

        },
        mixins: [ReactFireMixin],
        render: function () {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="recipeName"> Recipe Name </label>
                        <input type="text" id='recipeName' className="form-control"
                               value={this.state.recipeName} onChange={this.handleTitleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="ingredientType"> Ingredients </label>
                        <Select options={this.state.ingredients}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="recipeStep"> Steps </label>
                        <div className="input-group">
                            <input type="text" id='recipeStep' className="form-control"
                                   value={this.state.recipeStep} onChange={this.handleStepChange}/>
                            <span className="input-group-addon">+</span>
                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary"> Submit</button>
                </form>
            )
        },
        handleSubmit: function (e) {
            // console.log(this.firebaseRef);
            e.preventDefault();
            this.firebaseRef.push({
                ingredientName: this.state.ingredientName,
                ingredientType: this.state.ingredientType
            });
            this.setState({ingredientName: ""});
        }
    });
    var Search = React.createClass({
        getInitialState: function () {
            return {query: ''};
        },
        handleChange: function (e) {
            this.setState({query: e.target.value});
        },
        componentDidMount: function () {
        },
        mixins: [ReactFireMixin],
        render: function () {
            return (
                <div className='u-posRelative'>
                    <input class="Typeahead-hint" type="text" tabindex="-1" readonly="" dir="ltr"/>
                    <input ref="suggestion" id='ingredientSearch' className="form-control suggestions Typeahead-input"
                           type="text"
                           value={this.state.query}
                           onChange={this.handleChange} onBlur={this.handleChange}/>
                    <img className="Typeahead-spinner" src="../client/img/spinner.gif"/>
                </div>);
        }

    });

    ReactDOM.render(<IngredientAdder />, document.getElementById("ingredientAdder"));
    ReactDOM.render(<RecipeAdder />, document.getElementById("recipeAdder"));
    ReactDOM.render(<IngredientList />, document.getElementById("ingredientList"));

}());
