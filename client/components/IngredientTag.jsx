var React = require('react');

var IngredientTag = React.createClass({
    removeTag: function () {
        var ref = this.props.listSource;
        ref.child(this.props.content['.key']).remove();
    },
    render: function () {
        return (
            <div className="ingredient">
                <span>{this.props.content['.value']}</span>
                <span onClick={this.removeTag}>
                    <i className="fa fa-trash"/>
                </span>

            </div>

        )
    }
});

module.exports = IngredientTag;