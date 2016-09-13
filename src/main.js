import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import Paper from 'material-ui/Paper';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./main.scss');

import Firebase from 'firebase';


const Main = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <App />
    </MuiThemeProvider>
);

ReactDOM.render(<Main />, document.getElementById('index'));
