import React from 'react';
import IngredientTag from './IngredientTag.jsx';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';

const TagListBuilder = React.createClass({
    propTypes: {
        listSource: React.PropTypes.object.isRequired,
        masterList: React.PropTypes.object.isRequired,
        remove: React.PropTypes.func.isRequired,
        loading: React.PropTypes.bool.isRequired
        // listHeader: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            user: {},
            ingredients: {}
        };
    },
    render() {
        let ingredients = _(this.props.listSource)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.listSource[ingredientKey])};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value();

        function alphaByName(a, b) {
            if (a.value.name < b.value.name) {
                return -1;
            }
            if (a.value.name > b.value.name) {
                return 1;
            }
            return 0;
        }

        ingredients = ingredients.sort(alphaByName);

        const removeTag = this.props.remove;
        const click = this.props.click;
        return (
            <div className="chip-wrapper">
                {this.props.loading ? <CircularProgress size={1}/> : ingredients.map((tagContent, index) => { // TODO: figure out if this loading check is still needed???
                    return (<IngredientTag remove={removeTag} click={click} key={index} content={tagContent}
                                           list={this.props.masterList}/>);
                })}
            </div>
        );
    }
});

export default TagListBuilder;
