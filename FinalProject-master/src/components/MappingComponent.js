import React, { Component, Fragment } from "react";
var res = [];
class Mapping extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		// console.log(res[0]);
		// console.log(this.props.keys + " and " + expression);
		return (
			<Fragment>
				<table
					key={Math.random()}
					style={{
						border: "solid 2px black",
						height: "2px",
						width: "2px",
						BackgroundColor: "black"
					}}
				>
					<tbody key={Math.random()}>
						<tr>
							<td>{this.props.person}</td>

							<td>{this.props.value}</td>
						</tr>
					</tbody>
				</table>
				<table
					style={{
						border: "dotted 2px black",
						height: "4px",
						width: "4px",
						BackgroundColor: "black"
					}}
				>
					<tbody key={Math.random()}>
						<tr>THIS IS AVERAGE EXPRESSION OF CLASS</tr>
						<tr>
							<td>{this.props.avg}</td>
						</tr>
					</tbody>
				</table>
			</Fragment>
		);
	}
}
export default Mapping;
