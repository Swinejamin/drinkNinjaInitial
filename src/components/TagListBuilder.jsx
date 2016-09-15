import React from 'react';
import IngredientTag from './IngredientTag.jsx';
import _ from 'lodash';

const IngredientList = React.createClass({
    propTypes: {
        listSource: React.PropTypes.object.isRequired,
        removeTag: React.PropTypes.func.isRequired,
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
            if (a.value < b.value) {
                return -1;
            }
            if (a.value > b.value) {
                return 1;
            }
            return 0;
        }

        ingredients = ingredients.sort(alphaByName);

        const removeTag = this.props.removeTag;
        return (
            <div className="chip-wrapper">
                {ingredients.map((tagContent, index) => {
                    return (<IngredientTag removeTag={removeTag} key={index} content={tagContent}/>);
                })}
            </div>
        );
    }
});

export default IngredientList;
