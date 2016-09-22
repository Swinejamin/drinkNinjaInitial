import React from 'react';
import Chip from 'material-ui/Chip';
import {cyan500, grey400} from 'material-ui/styles/colors';

const styles = {
    chip: {
        margin: 4,
    },
};

const IngredientTag = React.createClass({
    propTypes: {
        remove: React.PropTypes.func.isRequired,
        content: React.PropTypes.object.isRequired,
        click: React.PropTypes.func.isRequired
    },
    click() {
        this.props.click(this.props.content);
    },
    removeTag() {
        this.props.remove(this.props.content);
        // firebase.database().ref(`users/${this.props.userRef}/ingredients`).child(this.props.content.key).remove();
    },
    render() {
        return (
            // TODO: add check for featured tags (from db?)
            <Chip style={styles.chip} backgroundColor={this.props.content.value.isFeatured ? cyan500 : grey400} onTouchTap={this.click} onRequestDelete={this.removeTag}>
                {this.props.content.value.name}
            </Chip>
        );
    }
});

export default IngredientTag;
