import React from 'react';
import TextField from 'material-ui/TextField';
import TagListBuilder from '../TagListBuilder';
const TagAdder = React.createClass({
    propTypes: {
        tagSource: React.PropTypes.object.isRequired,
        addTag: React.PropTypes.func.isRequired,
        removeTag: React.PropTypes.func.isRequired,
        listHeader: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {drinkTagName: ''};
    },
    handleNameChange(e) {
        this.setState({drinkTagName: e.target.value});
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.addTag('tags', this.state.drinkTagName);
        this.setState({drinkTagName: ''});
    },
    handleDelete(tag) {
        this.props.removeTag('tags', tag);
    },
    render() {
        return (
            <div className="console-adders">
                <form onSubmit={this.handleSubmit}>
                    <TextField fullWidth={true}
                               hintText="Christmas, Virgin, Star Wars..."
                               value={this.state.drinkTagName}
                               type="text"
                               floatingLabelText="Tag Name"
                               onChange={this.handleNameChange}/>
                </form>
                <TagListBuilder listSource={this.props.tagSource}
                                removeTag={this.handleDelete}
                                listHeader={this.props.listHeader}/>
            </div>
        );
    }
});

export default TagAdder;
