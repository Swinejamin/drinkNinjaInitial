import React from 'react';
import TextField from 'material-ui/TextField';
import TagListBuilder from '../TagListBuilder';


const UnitAdder = React.createClass({
    propTypes: {
        unitSource: React.PropTypes.object.isRequired,
        add: React.PropTypes.func.isRequired,
        remove: React.PropTypes.func.isRequired,
        unitNameSingle: React.PropTypes.string,
        unitNamePlural: React.PropTypes.string
    },
    getInitialState() {
        return {
            unitNameSingle: this.props.unitNameSingle || '',
            unitNamePlural: this.props.unitNamePlural || ''
        };
    },
    handleSingleChange(e) {
        this.setState({unitNameSingle: e.target.value});
    },
    handlePluralChange(e) {
        this.setState({unitNamePlural: e.target.value});
    },
    handleSubmit(e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.props.add('units', {single: this.state.unitNameSingle, plural: this.state.unitNamePlural});
        this.setState({unitNameSingle: '', unitNamePlural: ''});
    },
    handleDelete(tag) {
        this.props.remove('units', tag);
    },
    render() {
        return (
            <div className="console-adders">
                <form onSubmit={this.handleSubmit}>
                    <TextField fullWidth={true}
                               hintText="oz, gallon, pinch..."
                               type="text"
                               floatingLabelText="Unit Name (single)"
                               value={this.state.unitNameSingle}
                               onChange={this.handleSingleChange}/>
                    <TextField fullWidth={true}
                               hintText="oz, gallon, pinches..."
                               type="text"
                               floatingLabelText="Unit Name (plural)"
                               value={this.state.unitNamePlural}
                               onChange={this.handlePluralChange}/>
                </form>
                <TagListBuilder listSource={this.props.unitSource}
                                remove={this.handleDelete}
                                listHeader={this.props.listHeader} loading={this.props.loadingUnits}  masterList={this.props.masterUnits}/>
            </div>
        );
    }
});

export default UnitAdder;