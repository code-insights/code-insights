import React from 'react';
import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import Setup from './components/Setup';
import ResultView from './components/ResultView'

class App extends React.Component {
	render () {
		return (
			<MuiThemeProvider>
				<Setup />
				<ResultView />
			</MuiThemeProvider>
		);
	}
}

injectTapEventPlugin();
render(<App/>, document.getElementById('app'));
