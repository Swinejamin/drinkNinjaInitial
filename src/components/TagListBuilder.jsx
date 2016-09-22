import React from 'react';
import IngredientTag from './IngredientTag.jsx';
import _ from 'lodash';
import Subheader from 'material-ui/Subheader';

const IngredientList = React.createClass({
    propTypes: {
        listSource: React.PropTypes.object.isRequired,
        remove: React.PropTypes.func.isRequired,
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
                {/*<Subheader>{this.props.listHeader}</Subheader>*/}
                {ingredients.map((tagContent, index) => {
                    return (<IngredientTag remove={removeTag} click={click} key={index} content={tagContent}/>);
                })}
            </div>
        );
    }
});

export default IngredientList;
