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

		fetch("http://192.168.1.222:8001/submit", 
		{
			method: "POST",
			body: JSON.stringify(payload)
		})
		.then(function(res) {return res.json(); })
		.then(function(data) { console.log(data); window.location.reload()});
	};

	render () {
		return (
			<div>
				<TextField 
					hintText="Repository URL" 
					onChange={(e) => this.setState({url: e.target.value})} /> 

				<RaisedButton 
					label="Primary" 
					primary={true} 
					onTouchTap={this.sendJobToServer} />
			</div>
		);
	}
}
