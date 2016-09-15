import React from 'react';
import IngredientFinder from './IngredientFinder.jsx';
import IngredientList from './IngredientList.jsx';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import Drawer from 'material-ui/Drawer';
import base from '../modules/rebase';

const Dashboard = React.createClass({
    getInitialState() {
        return {
            user: {},
            ingredients: {},
            masterIngredients: {},
            loading: 'loading',
            docked: true,
            drawerOpen: true
        };
    },

    componentWillMount() {
        this.mql = window.matchMedia('(min-width: 800px)');
        this.mql.addListener(this.mediaQueryChanged);
        this.handleSizeChange();
        window.addEventListener('resize', () => {
            this.handleSizeChange();
        });
    },

    componentDidMount() {
        base.onAuth((authData) => {
            if (authData) {
                console.log("User " + authData.uid + " is logged in with " + authData.provider);
                this.userRef = firebase.database().ref(`users/${base.auth().currentUser.uid}`);
                this.uid = base.auth().currentUser.uid;
                base.bindToState(`users/${this.uid}`, {
                    context: this,
                    state: 'user',
                    asArray: false,
                });
                base.bindToState(`users/${this.uid}/ingredients`, {
                    context: this,
                    state: 'ingredients',
                    asArray: false,
                    then() {
                        this.setState({loading: 'hide'});
                    }
                });
                base.bindToState('ingredients', {
                    context: this,
                    state: 'masterIngredients',
                    asArray: false
                });
            } else {
                console.log("User is logged out");
            }
        });
    },

    componentWillUnmount() {
        // base.removeBinding(this.ref);
    },

    handleAddIngredient(newIngredient) {
        const key = newIngredient.key;
        const data = {};
        data[key] = newIngredient.value;
        base.update(`users/${this.uid}/ingredients`, {
                data: data
            }
        )
        ;
    },

    handleTap() {
        const neg = !this.state.drawerOpen;
        this.setState({
            drawerOpen: neg
        });
    },

    handleSizeChange() {
        this.setState({mql: this.mql, docked: this.mql.matches});
    },

    removeTag(tag) {
        const data = {};
        data[tag.key] = null;
        const targetStr = `users/${this.uid}/ingredients/${tag.key}`;
        const target = base.database().ref(targetStr);
        target.remove();
    },

    toggleDrawer() {
        const neg = !this.state.drawerOpen;
        this.setState(
            {
                drawerOpen: neg
            }
        );
    },

    render() {
        return (
            <Paper>
                <Drawer id="Drawer" docked={this.state.docked} open={this.state.drawerOpen}
                        onRequestChange={this.toggleDrawer} width={500}>

                    <Card>
                        <CardHeader title="Your cabinet"/>
                        <RefreshIndicator status={this.state.loading}
                                          left={50}
                                          top={50}/>
                        {this.state.loading !== 'loading' ? (
                            <CardText >
                                <IngredientFinder id="IngredientFinder" masterList={this.state.masterIngredients}
                                                  userList={this.state.ingredients}
                                                  addIngredient={this.handleAddIngredient}/>

                                <IngredientList listSource={this.state.ingredients} removeTag={this.removeTag}/>
                            </CardText>) : (<CardText />)}
                    </Card>


                </Drawer>

            </Paper>
        );
    }
});

export default Dashboard;


