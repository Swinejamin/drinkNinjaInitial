import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router';

const RecipeBrowser = React.createClass({
    propTypes: {
        recipes: React.PropTypes.object.isRequired,
        userIngredients: React.PropTypes.object.isRequired
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
    checkfeatured(recipe) {
        console.log(recipe);
        const ingredient = recipe.value.ingredientList.some((ing)=>{
            return this.props.userIngredients[ing.ingredient].isFeatured;
        });
        // TODO uncomment when tags are added to recipes
        // const tag = recipe.value.tagList.some((tg)=>{
        //     return tg.isFeatured;
        // });
        return (ingredient);
    },
    render() {

        let masterRecipeList = _(this.props.recipes)
            .keys()
            .map((recipeKey) => {
                const cloned = {'value': _.clone(this.props.recipes[recipeKey])};
                cloned.key = recipeKey;
                return cloned;
            })
            .value()
            .sort(this.alphaByName);
        return (
            <GridList cols={2} padding={15} cellHeight={400} style={{paddingTop: 15}}>
                {masterRecipeList.map((recipe, index)=> {
                    const featured = this.checkfeatured(recipe);
                        return (
                            <GridTile title={recipe.value.title}
                                      key={index} titlePosition="top"
                                      containerElement={<Link to={`recipe/${recipe.key}`}/>}
                                      rows={featured ? 2 : 1} cols={featured ? 2 : 1}
                                      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                                <img src={recipe.value.imgUrl || '/images/dnLogo.png'}/>
                            </GridTile>
                        );
                    }
                )}
            </GridList>
        );
    }
});

export default RecipeBrowser;