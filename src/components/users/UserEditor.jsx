"use strict";

import React from 'react';

import base from '../../modules/rebase';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

const UserEditor = React.createClass({
    getInitialState() {
        return {
            userList: []
        };
    },
    componentWillMount() {
        this.userList = base.bindToState('users', {
            context: this,
            state: 'userList',
            asArray: true,
            then() {
            }
        });
    },
    toggleAdmin(user) {
        console.log(user);
        const target = base.database().ref(`users/${user.key}/isAdmin`);
        target.set(!user.isAdmin);
    },
    render() {
        return (
            <div>{
                this.state.userList.map((user, index) => {
                    return (
                        <div>
                            <Card>
                                <CardHeader title={`${user.firstName} ${user.lastName}`}
                                            subtitle={`Admin: ${user.isAdmin}`}/>
                                <CardText>
                                    <Toggle label="Admin" onToggle={() => this.toggleAdmin(user)} toggled={user.isAdmin}/>
                                </CardText>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    }
});

export default UserEditor;
