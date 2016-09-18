import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router';

const RecipeBrowser = React.createClass({
    propTypes: {
        recipes: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return null;
    },
    alphaByName(a, b) {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    },
    render() {
        let masterRecipeList = _(this.props.recipes)
            .keys()
            .map((recipeKey) => {
                const cloned = {'value': _.clone(this.props.recipes[recipeKey])};
                cloned.key = recipeKey;
                return cloned;
            })
            .value().sort(this.alphaByName);
        return (
            <GridList cols={3} padding={15} cellHeight={300} style={{paddingTop: 15}}>
                {masterRecipeList.map((recipe, index)=>(
                        <GridTile title={recipe.value.title}
                                  key={index} titlePosition="top"
                                  containerElement={<Link to={`recipe/${recipe.key}`}/>}
                                  rows={1} cols={recipe.value.image.portrait ? 1 : 2}
                                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                            <img src={recipe.value.image.url}/>
                        </GridTile>
                    )
                )}
            </GridList>
        );
    }
});

export default RecipeBrowser;