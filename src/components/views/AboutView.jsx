import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const AboutView = React.createClass({
    getInitialState() {
        return ({
            expanded: true
        });
    },
    render() {
        return (
            <div className="view-wrapper">
                <div className="console-paper">
                    <Card style={{maxWidth: 800}} expanded={this.state.expanded}>
                        <CardHeader
                            title={`About ${appTitle}`}
                            subtitle={`${appTitle} is an app for discovering new drinks.`}
                        />
                        <CardMedia expandable={true}>
                            <img src={'/images/dnLogo.png'}/>
                        </CardMedia>
                        <CardText>

                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
});

export default AboutView;
