"use strict";

import React from 'react';
import base from '../../modules/rebase';
import {Link} from 'react-router';

import RecipeAdder from '../recipes/RecipeAdder.jsx';
import IngredientAdder from '../ingredients/IngredientAdder.jsx';
import TagAdder from '../tags/TagAdder.jsx';
import UnitAdder from '../units/UnitAdder.jsx';
import DropDownMenu from 'material-ui/DropDownMenu';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';

const Console = React.createClass({
    getInitialState() {
        return {
            ingredients: {},
            tags: {},
            units: {},
            linkName: 'Ingredients'
        };
    },
    componentWillMount() {
    },
    componentWillUnmount() {
    },
    handleAdd(type, value) {
        const target = base.database().ref(`${type}`);
        target.push(value);
    },
    handleDelete(type, ref) {
        const target = base.database().ref(`${type}/${ref.key}`);
        target.remove();
    },
    handleLinkChange(event, index, value) {
        event.preventDefault();
        this.setState({
            linkName: value
        });
    },
    render() {
        return (
            <div className="view-wrapper">
                <Paper className="console-paper">
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <DropDownMenu value={this.state.linkName} onChange={this.handleLinkChange}>
                                <MenuItem value={"Ingredients"} primaryText="Ingredients"
                                          containerElement={<Link to={'/console/ingredients'}/>}/>
                                <MenuItem value={"Recipes"} primaryText="Recipes"
                                          containerElement={<Link to={'/console/recipes'}/>}/>
                                <MenuItem value={"Tags"} primaryText="Tags"
                                          containerElement={<Link to={'/console/tags'}/>}/>
                                <MenuItem value={"Units"} primaryText="Units"
                                          containerElement={<Link to={'/console/units'}/>}/>
                                <MenuItem value={"Users"} primaryText="Users"
                                          containerElement={<Link to={'/console/users'}/>}/>
                            </DropDownMenu>
                        </ToolbarGroup>
                    </Toolbar>
                    {this.props.children && React.cloneElement(this.props.children, {
                        uid: this.props.uid,
                        user: this.props.user,
                        masterIngredients: this.props.masterIngredients,
                        ingredients: this.props.ingredients,
                        masterUnits: this.props.units,
                        masterTags: this.props.tags,
                        recipes: this.props.recipes,
                        loading: this.props.loading,
                        tagSource: this.props.masterTags,
                        ingredientSource: this.props.masterIngredients,
                        unitSource: this.props.masterUnits,
                        add: this.handleAdd,
                        remove: this.handleDelete
                    })}
                    {/*<Tabs>*/}
                    {/*<Tab label="Ingredient">*/}
                    {/*<IngredientAdder ingredientSource={this.props.masterIngredients}*/}
                    {/*addIngredient={this.handleAdd}*/}
                    {/*remove={this.handleDelete} listHeader="Master ingredient list"/>*/}
                    {/*</Tab>*/}
                    {/*<Tab label="Tag">*/}
                    {/*<TagAdder tagSource={this.props.masterTags} addTag={this.handleAdd}*/}
                    {/*remove={this.handleDelete} listHeader="Master tag list"/>*/}
                    {/*</Tab>*/}
                    {/*<Tab label="Unit">*/}
                    {/*<UnitAdder unitSource={this.props.masterUnits} addUnit={this.handleAdd}*/}
                    {/*remove={this.handleDelete} listHeader="Master unit list"/>*/}
                    {/*</Tab>*/}
                    {/*</Tabs>*/}
                </Paper>

                {/*<div className="console-paper">*/}
                {/*<Toolbar>*/}
                {/*<ToolbarGroup>*/}
                {/*<ToolbarTitle text="Add a recipe to the database"/>*/}
                {/*</ToolbarGroup>*/}
                {/*</Toolbar>*/}
                {/*<RecipeAdder addRecipe={this.handleAdd} masterIngredientList={this.props.masterIngredients}*/}
                {/*masterTagList={this.props.masterTags} masterUnitList={this.props.masterUnits}/>*/}
                {/*</div>*/}
            </div>
        );
    }
});

export default Console;
