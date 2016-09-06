var React = require('react');
var Select = require('react-select');

var RecipeAdder = React.createClass({
    getInitialState: function () {
        return {ingredients: [], Title: ''};
    },
    handleTitleChange: function (e) {
        this.setState({recipeTitle: e.target.value});
    },
    handleIngredientChange: function(ingredient){
        this.setState({ingredient});
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
        function getOptions(input, cb) {
            var ref = firebase.database().ref('ingredients');
            var ops = [];
            ref.orderByChild('ingredientName').on('child_added', function (snap) {
                var val = snap.val();
                ops.push({value: snap.key, label: val.ingredientName});

            });
            var fixed = ops.map(function(obj, ind){
                return { value: ind, label: obj.ingredientName}
            });
            var data = {options: ops};
            cb(null, data);
            //cb(err, data)
            // cb(null, )

        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="recipeName"> Recipe Name </label>
                    <input type="text" id='recipeName' className="form-control"
                           value={this.state.recipeName} onChange={this.handleTitleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="ingredients"> Ingredients </label>
                    <div id='ingredients' className="input-group">
                        <Select.Async value={this.state.ingredients} className="" multi={true} loadOptions={getOptions} onChange={this.handleIngredientChange}/>
                    </div>

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

module.exports = RecipeAdder;