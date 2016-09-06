var React = require('react');
var Select = require('react-select');

var MasterIngredientList = React.createClass({
    getInitialState: function () {
        return {ingredientList: null};
    },
    componentWillMount: function(){
        var masterIngredients = firebase.database().ref('ingredients');
        this.bindAsArray(masterIngredients, 'masterIngredients')
    },
    mixins: [ReactFireMixin],
    render: function () {
        var masterIngredients = this.state.masterIngredients;
        function getOptions(input, cb) {

            var data = {options: masterIngredients};
            cb(null, data);
        }

        return (
            <div id='ingredients' className="input-group">
                {/*TODO: switch value and Label on everything*/}
                <Select.Async value={this.state.ingredientList} className="" multi={this.props.multi} loadOptions={getOptions}
                              onChange={this.props.changeFunc(this)} valueKey='.key' labelKey="ingredientName"/>
            </div>
        );
    }
});

module.exports = MasterIngredientList;