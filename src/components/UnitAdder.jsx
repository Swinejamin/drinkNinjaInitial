import React from 'react';
import TextField from 'material-ui/TextField';
import TagListBuilder from './TagListBuilder';


const UnitAdder = React.createClass({
    propTypes: {
        unitSource: React.PropTypes.object.isRequired,
        addUnit: React.PropTypes.func.isRequired,
        removeUnit: React.PropTypes.func.isRequired,
        listHeader: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {unitName: ''};
    },
    componentWillMount() {
        this.firebaseRef = firebase.database().ref("units");
    },
    handleNameChange(e) {
        this.setState({unitName: e.target.value});
    },
    handleSubmit(e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.props.addUnit('units', this.state.unitName);
        this.setState({unitName: ''});
    },
    handleDelete(tag) {
        this.props.removeUnit('units', tag);
    },
    render() {
        return (
            <div className="console-adders">
                <form  onSubmit={this.handleSubmit}>
                <TextField fullWidth={true}
                           hintText="oz, gal, pinch..."
                           type="text"
                           floatingLabelText="Unit Name"
                           value={this.state.unitName}
                           onChange={this.handleNameChange}/>
            </form>
                <TagListBuilder listSource={this.props.unitSource}
                                removeTag={this.handleDelete}
                                listHeader={this.props.listHeader}/>
            </div>
        );
    }
});

export default UnitAdder;