import React, { Component } from "react";
import Axios from "../../../../server/node_modules/axios";
import MappingResult from "./mappingResult";
import "./result.css";
var temp;
var temp1 = null;
var name = [];
var expression = [];
var table;
export default class Result extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			overall: "",
		};
		this.final = this.final.bind(this);
	}
	componentDidMount() {
		Axios.get("/finalExpression").then((res) => {
			if (res.data != null) {
				temp = res.data;
			}
			console.log(res.data);

			for (let i in temp) {
				name[i] = temp[i].name;
				expression[i] = temp[i].expression;
			}
			this.setState({
				data: res.data,
			});
		});

		Axios.get("/overall_expression").then((res) => {
			if (res.data != null) {
				temp1 = res.data;
			}
			console.log(res.data.expression);

			this.setState({
				overall: res.data.expression,
			});
		});

		// console.log(Object.keys(temp[0]));
		// console.log(this.state.data);
	}
	final() {
		table = <MappingResult data={this.state.data} />;
	}
	render() {
		// var dummy = temp[0].map((value) => {
		// 	console.log(value.name);
		// });
		// var list = name.map((name) => {
		// 	<tr>{name}</tr>;
		// });
		if (name.length > 1 && temp1 != null) {
			console.log("hi");
			// this.setState({
			// 	data: temp,
			// });
			console.log(this.state.data);
			console.log(temp);
			console.log(name);
			console.log(expression);
			this.final();
		}

		return (
			<div className="main_result">
				<div className="sub1_result">
					{/* <MappingResult data={this.state.data} /> */}
					<h1>INDIVIDUAL EXPRESSION</h1>
					{table}
				</div>
				<div className="sub2_result">
					<h1>Overall Expression</h1>
					<h3>{this.state.overall}</h3>
				</div>
			</div>
		);
	}
}
