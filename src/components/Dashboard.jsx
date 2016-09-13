import React from 'react';
import IngredientFinder from './IngredientFinder.jsx';
import IngredientList from './IngredientList.jsx';
import Rebase from 're-base';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const base = Rebase.createClass({
    apiKey: 'AIzaSyAu0WdxVgdV_HPz28RoYfHb-W7P7aIGkN0',
    authDomain: 'drinkme-6efd3.firebaseapp.com',
    databaseURL: 'https://drinkme-6efd3.firebaseio.com',
    storageBucket: 'drinkme-6efd3.appspot.com'
});

const styles = {
    drawer: {
        padding: 5
    },
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};
class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            ingredients: {},
            masterIngredients: {},
            loading: 'loading',
            docked: true,
            drawerOpen: false
        };
        this.userRef = '';
        this.mql = window.matchMedia('(min-width: 800px)');
        this.mql.addListener(this.mediaQueryChanged);
        window.onResize = this.handleSizeChange;
    }

    componentWillMount() {
        this.handleSizeChange();
        window.addEventListener('resize', () => {
            this.handleSizeChange();
        });
    }

    componentDidMount() {
        base.onAuth((authData) => {
            if (authData) {
                console.log("User " + authData.uid + " is logged in with " + authData.provider);
                this.userRef = firebase.database().ref(`users/${base.auth().currentUser.uid}`);
                this.uid = base.auth().currentUser.uid;
                base.syncState(`users/${this.uid}`, {
                    context: this,
                    state: 'user',
                    asArray: false,
                });
                base.syncState(`users/${this.uid}/ingredients`, {
                    context: this,
                    state: 'ingredients',
                    asArray: false,
                    then() {
                        this.setState({loading: 'hide'});
                    }
                });
                base.syncState('ingredients', {
                    context: this,
                    state: 'masterIngredients',
                    asArray: false
                });
            } else {
                console.log("User is logged out");
            }
        });
    }

    componentWillUnmount() {
        // base.removeBinding(this.ref);
    }

    handleAddIngredient(newIngredient) {
        const key = newIngredient.key;
        const data = {};
        data[key] = newIngredient.value;
        base.update(`users/${this.uid}/ingredients`, {
                data: data
            }
        )
        ;
    }

    handleTap() {
        const neg = !this.state.drawerOpen;
        this.setState({
            drawerOpen: neg
        });
    }

    handleSizeChange() {
        this.setState({mql: this.mql, docked: this.mql.matches});
    }

    removeTag(tag) {
        const data = {};
        data[tag.key] = null;
        const targetStr = `users/${this.uid}/ingredients/${tag.key}`;
        const target = base.database().ref(targetStr);
        console.log(target);
        target.remove();
    }

    toggleDrawer() {
        const neg = !this.state.drawerOpen;
        this.setState(
            {
                drawerOpen: neg
            }
        );
    }

    render() {
        return (
            <Paper>
                <AppBar title="Drink finder app" onLeftIconButtonTouchTap={this.handleTap.bind(this)}/>
                <Drawer id="Drawer" docked={this.state.docked} open={this.state.drawerOpen}
                        onRequestChange={this.toggleDrawer.bind(this)} width={500}>

                    <Card>
                        <CardHeader title="Your cabinet"/>
                        <CardText >
                            <IngredientFinder id="IngredientFinder" masterList={this.state.masterIngredients}
                                              userList={this.state.ingredients}
                                              addIngredient={this.handleAddIngredient.bind(this)}/>
                            <RefreshIndicator status={this.state.loading}
                                              left={10}
                                              top={0}/>
                            <IngredientList listSource={this.state.ingredients} removeTag={this.removeTag.bind(this)}/>
                        </CardText>
                    </Card>


                </Drawer>

            </Paper>
        );
    }
}

export default Dashboard;

