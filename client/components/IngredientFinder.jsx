var React = require('react');

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
    handleNewIngredient: function (val) {
        this.props.userData.child('ingredients/' + val.value).set(val.label);
    },
    componentDidMount: function () {
        this.userRef = firebase.database().ref(this.props.userData);
        this.bindAsArray(this.userRef.child('ingredients'), 'ingredients');

    }, render: function () {
        function getOptions(input, cb) {
            var ref = firebase.database().ref('ingredients');
            var ops = [];
            ref.orderByChild('ingredientName').on('child_added', function (snap) {
                var val = snap.val();
                console.log();
                ops.push({value: snap.key || 0, label: val.ingredientName});

            });
            // ops = ops.filter(function(el){
            //     return (userIngredients.indexOf(el.label) >= 0);
            // });
            var data = {options: ops};
            cb(null, data);
            //cb(err, data)
            // cb(null, )

        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <Select.Async className="" loadOptions={getOptions}
                                  matchPos='any' matchProp="label"
                                  onChange={this.handleNewIngredient}/>
                </div>
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

module.exports = IngredientAdder;