import React from 'react';
import Chip from 'material-ui/Chip';
import firebase from 'firebase';
const styles = {
    chip: {
        margin: 4,
    },
};

const IngredientTag = React.createClass({
    propTypes: {
        removeTag: React.PropTypes.func.isRequired,
        content: React.PropTypes.object.isRequired
    },
    removeTag() {
        this.props.removeTag(this.props.content);
        // firebase.database().ref(`users/${this.props.userRef}/ingredients`).child(this.props.content.key).remove();
    },
    render() {
        return (
            <Chip style={styles.chip} onRequestDelete={this.removeTag}>
                {this.props.content.value}
            </Chip>
        );
    }
});

export default IngredientTag;
