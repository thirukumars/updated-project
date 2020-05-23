import React, { Component, Fragment } from "react";
import "./mapping.css";
class MappingResult extends Component {
	constructor(props) {
		super(props);
		this.getHeader = this.getHeader.bind(this);
		this.getRowsData = this.getRowsData.bind(this);
		this.getKeys = this.getKeys.bind(this);
	}
	componentDidMount() {
		console.log(this.props.data);
		console.log(this.props.data[0]);
		console.log(this.props.overall);
	}
	getKeys = function () {
		return Object.keys(this.props.data[0]);
	};

	getHeader = function () {
		var keys = this.getKeys();
		return keys.map((key, index) => {
			return <th key={key}>{key.toUpperCase()}</th>;
		});
	};

	getRowsData = function () {
		var items = this.props.data;
		console.log(items);
		var keys = this.getKeys();

		return items.map((row, index) => {
			return (
				<tr key={index}>
					<RenderRow key={index} data={row} keys={keys} />
				</tr>
			);
		});
	};

	render() {
		return (
			<div>
				<table>
					<thead>
						<tr>{this.getHeader()}</tr>
					</thead>
					<tbody>{this.getRowsData()}</tbody>
				</table>
			</div>
		);
	}
}
const RenderRow = (props) => {
	return props.keys.map((key, index) => {
		console.log(props.data[key] + "kakak" + props.data[key]);
		return <td key={props.data[key]}>{props.data[key]}</td>;
	});
};
export default MappingResult;
