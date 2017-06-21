import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Setup extends React.Component {
	
	constructor(props) {
		super(props);
	}

	state = { 
		jobId : "",
		url: ""
	};

	sendJobToServer = () => { 
		var payload = {
			url: this.state.url
		};

		fetch("http://127.0.0.1:4567/repository-processor", 
		{
			method: "POST",
			body: this.state.url
		})
		.then(function(res) {return res.json(); })
		.then(function(data) { console.log(data.data); });
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
