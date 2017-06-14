import React from 'react';
import {render} from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import Setup from './components/Setup';

class App extends React.Component {
	render () {
		return (
			<MuiThemeProvider>
				<Setup />
			</MuiThemeProvider>
		);
	}
}

render(<App/>, document.getElementById('app'));
