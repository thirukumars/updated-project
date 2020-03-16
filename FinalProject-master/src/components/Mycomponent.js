import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function select(props) {
	return (
		<div>
			<div className="row">
				<div className="form-group">
					<label htmlFor="exampleFormControlSelect1"> Person</label>
					<select
						name="person"
						className="form-control"
						id="exampleFormControlSelect1"
					>
						<option value={props.value}>{props.value} </option>
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col-4 ">
					<div className="form-group">
						<label htmlFor="exampleFormControlSelect1"> Expression</label>
						<select
							name="Expression"
							// value={this.state.personValue}
							// onChange={this.handleChangePerson.bind(this)}
							className="form-control"
							id="exampleFormControlSelect1"
						>
							<option value="Neutral">Neutral</option>
							<option value="Happy">Happy</option>
							<option value="Sad">Sad</option>
							<option value="Angry">Angry</option>
							<option value="Fearful">Fearful</option>
							<option value="Disgusted">Disgusted</option>
							<option value="Surprised">Surprised</option>
						</select>

						{/* {this.select()} */}
					</div>
				</div>
				<div className="col-4">
					<div className="form-group">
						<label htmlFor="iotData">IOT</label>
						<select name="iot" className="form-control IOT">
							<option value="IOT 1">IOT 1</option>
							<option value="IOT 2">IOT 2</option>
							<option value="IOT 3">IOT 3</option>
							<option value="IOT 4">IOT 4</option>
							<option value="IOT 5">IOT 5</option>
							<option value="IOT 6">IOT 6</option>
							<option value="IOT 7">IOT 7</option>
							<option value="IOT 8">IOT 8</option>
							<option value="IOT 9">IOT 9</option>
							<option value="IOT 10">IOT 10</option>
						</select>
					</div>
				</div>
				<div className="col-4">
					<div className="form-group">
						<label htmlFor="exampleFormControlSelect1">Value</label>
						<input
							name="input"
							type="text"
							className="form-control"
							placeholder="Value"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default select;
