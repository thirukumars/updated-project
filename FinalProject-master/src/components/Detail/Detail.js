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
var class_Name = "";
export default class Detail extends Component {
	// constructor(){
	//     this.props()
	// }
	OnHome = () => {
		var AppUrl = "/#Home";
		browserHistory.push(AppUrl);
		window.location.reload();
	};
	events(e) {
		class_Name = e.target.value;
		console.log(e.target.value);
		console.log(class_Name);
	}
	render() {
		return (
			<div className="main">
				<h1>EMOTIONAL DETECTION USING MACHINE LEARNING</h1>
				<div className="subContent">
					<Form onSubmit={this.OnHome}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Staff Name</Form.Label>
							<Form.Control
								name="staffName"
								type="text"
								placeholder="Staff Name"
								onChange={this.events}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Subject</Form.Label>
							<Form.Control type="text" placeholder="subject" name="subject" />
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Department</Form.Label>
							<Form.Control
								type="text"
								placeholder="Department"
								name="Department"
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Batch</Form.Label>
							<Form.Control type="text" placeholder="Batch" name="batch" />
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
