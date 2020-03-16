import React, { Component } from "react";
import { browserHistory } from "react-router";

var res;
class App extends Component {
	constructor() {
		super();
		this.state = {
			value: "capture"
		};
	}

	OnFirst = () => {
		var AppUrl = "/#First";
		browserHistory.push(AppUrl);
		window.location.reload();
	};
	OnSecond = () => {
		var AppUrl = "/#Second";
		browserHistory.push(AppUrl);
		window.location.reload();
	};

	render() {
		return (
			<div>
				<button onClick={this.OnFirst}>CaptureImage</button>
				<button onClick={this.OnSecond}>Recognization</button>
			</div>
		);
	}
}

export default App;
