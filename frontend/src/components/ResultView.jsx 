import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class ResultView extends React.Component {
	
	constructor(props) {
		super(props);
	}

	state = { 
		jobId : "",
		url: ""
	};

	render () {
		return (
			<div>
				<TextField 
					hintText="Repository URL" 
					onChange={(e) => this.setState({url: e.target.value})} /> 

				<RaisedButton 
					label="Submit" 
					primary={true} 
					onTouchTap={this.sendJobToServer} />
			</div>
		);
	}
}
