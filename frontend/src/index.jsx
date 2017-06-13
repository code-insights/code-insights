import React from 'react';
import {render} from 'react-dom';

import TextField from 'material-ui/TextField';

class App extends React.Component {
  render () {
    return (
		<TextField
			hintText="Hint Text">
		</TextField>
	);
  }
}

render(<App/>, document.getElementById('app'));
