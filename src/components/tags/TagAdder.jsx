import React from 'react';
import TextField from 'material-ui/TextField';
import TagListBuilder from '../TagListBuilder';
const TagAdder = React.createClass({
    propTypes: {
        tagSource: React.PropTypes.object.isRequired,
        add: React.PropTypes.func.isRequired,
        remove: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {drinkTagName: ''};
    },
    handleNameChange(e) {
        this.setState({drinkTagName: e.target.value});
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.add('tags', this.state.drinkTagName);
        this.setState({drinkTagName: ''});
    },
    handleDelete(tag) {
        this.props.remove('tags', tag);
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
                                remove={this.handleDelete}/>
            </div>
        );
    }
});

export default TagAdder;
