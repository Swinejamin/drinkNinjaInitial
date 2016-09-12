import React from 'react';
import IngredientTag from './IngredientTag.jsx';
import Card from 'material-ui/Card';
import firebase from 'firebase';
import _ from 'lodash';
import Rebase from 're-base';

class IngredientList extends React.Component {
    static propTypes = {
        listSource: React.PropTypes.object.isRequired,
        removeTag: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            ingredients: {}
        };
    }

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
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }
        ingredients = ingredients.sort(alphaByName);

        const removeTag = this.props.removeTag;
        return (
            <div>
                <h1>Current Ingredients</h1>

                {ingredients.map((ingredient, index) => {
                    return (<IngredientTag removeTag={removeTag} key={index} content={ingredient}/>);
                })}


            </div>
        );
    }
}

export default IngredientList;
