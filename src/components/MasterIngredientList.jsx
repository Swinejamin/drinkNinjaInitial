var React = require('react');
var Select = require('react-select');

var MasterIngredientList = React.createClass({
    getInitialState: function () {
        return {ingredientList: null};
    },
    componentWillMount: function () {
        var masterIngredients = firebase.database().ref('ingredients');
        this.bindAsArray(masterIngredients, 'masterIngredients')
    },
    onChange: function (value) {
        this.setState({ingredientList: value});
        this.props.listenerFromParent(value);
    },
    mixins: [ReactFireMixin],
    render: function () {
        function alphaByName(a,b) {
            if (a.ingredientName < b.ingredientName)
                return -1;
            if (a.ingredientName > b.ingredientName)
                return 1;
            return 0;
        }
        var masterIngredients = this.state.masterIngredients.sort(alphaByName);

        function getOptions(input, cb) {

            var data = {options: masterIngredients};
            cb(null, data);
        }

        return (
            <div id='ingredients' className="input-group">
                {/*TODO: switch value and Label on everything*/}
                <Select.Async value={this.state.ingredientList} className="" multi={this.props.multi}
                              loadOptions={getOptions}
                              onChange={this.onChange} valueKey='.key' labelKey="ingredientName"/>
            </div>
        );
    }
});

module.exports = MasterIngredientList;