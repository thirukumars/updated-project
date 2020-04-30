import React, { Component } from "react";
import { browserHistory } from "react-router";
import "./Detail.css";
import {
	Form,
	FormControl,
	FormGroup,
	ControlLabel,
	Button,
} from "react-bootstrap";
export default class Detail extends Component {
	// constructor(){
	//     this.props()
	// }
	OnHome = () => {
		var AppUrl = "/#Home";
		browserHistory.push(AppUrl);
		window.location.reload();
	};
	render() {
		return (
			<div className="main">
				<h1>EMOTIONAL DETECTION USING MACHINE LEARNING</h1>
				<div className="subContent">
					<Form onSubmit={this.OnHome}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Class Name</Form.Label>
							<Form.Control type="text" placeholder="Class Name" />
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label></Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
