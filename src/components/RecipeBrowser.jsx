var React = require('react');

var Select = require('react-select');

var RecipeBrowser = React.createClass({
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
        var ref = this.props.userData;
        this.bindAsArray(ref, 'ingredients');

    },
    mixins: [ReactFireMixin],
    render: function () {
        function getOptions(input, cb) {
            var ref = firebase.database().ref('ingredients');
            var userData = this.props.userData;
            var ops = [];
            ref.orderByChild('ingredientName').startAt(input).endAt(input + '\uf8ff').on('child_added', function (snap, ind) {
                var val = snap.val();
                ops.push({value: ind || 0, label: val.ingredientName});

            });
            ops = ops.filter(function(el){
                return (userData.indexOf(el.label) >= 0);
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
                    <label htmlFor="ingredientType"> Ingredients </label>
                    <div className="input-group">
                        <Select.Async className="" multi={true} loadOptions={getOptions}/>
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

module.exports = RecipeBrowser;