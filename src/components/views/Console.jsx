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
import CircularProgress from 'material-ui/CircularProgress';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';

const Console = React.createClass({
    getInitialState() {
        return {
            ingredients: {},
            tags: {},
            units: {},
            linkName: ''
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
            linkName: event.target.innerHTML
        });
    },
    render() {
        return (
            <div className="view-wrapper">
                <Paper className="console-paper">
                    <Tabs>
                        <Tab label="Ingredient">
                            { this.props.loadingIngredients ? <CircularProgress size={5}/> :
                                <IngredientAdder ingredientSource={this.props.masterIngredients}
                                                 add={this.handleAdd}
                                                 remove={this.handleDelete} listHeader="Master ingredient list"
                                                 masterIngredients={this.props.masterIngredients}/>}
                        </Tab>
                        <Tab label="Tag">
                            { this.props.loadingTags ? <CircularProgress size={2}/> :
                                <TagAdder tagSource={this.props.masterTags} add={this.handleAdd}
                                          remove={this.handleDelete} listHeader="Master tag list"
                                          masterTags={this.props.masterTags}/>}
                        </Tab>
                        <Tab label="Unit">
                            { this.props.loadingUnits ? <CircularProgress size={2}/> :
                                <UnitAdder unitSource={this.props.masterUnits} add={this.handleAdd}
                                           remove={this.handleDelete} listHeader="Master unit list"
                                           masterUnits={this.props.masterUnits}/>}
                        </Tab>
                    </Tabs>
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
