import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Setup extends React.Component {
	
	constructor(props) {
		super(props);
	}

	state = { 
		url: "",
		data: "",
		success: false
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
		.then(function(data) { 
			this.setState({ 
				data: data.data,
				success: true
			});
		});
	};

	render () {
		let table = null;
		if (this.state.success) {
			table = <div> {this.state.data} </div>;
		} else {
			table = <div></div>;
		}

		return (
			<div>
				<TextField 
					hintText="Repository URL" 
					onChange={(e) => this.setState({url: e.target.value})} /> 

				<RaisedButton 
					label="Submit" 
					primary={true} 
					onTouchTap={this.sendJobToServer} />
				{table}
			</div>
		);
	}
}
