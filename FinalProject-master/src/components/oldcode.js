import React, { Component, Fragment } from "react";
import * as faceapi from "face-api.js";
import { browserHistory } from "react-router";
import MappingComponent from "./MappingComponent";
// import base64ToImage from "base64-to-image";
// import nameArray from './capture';
//axios
import axios from "axios";

// import Mycomponent from "./Mycomponent";
import "bootstrap/dist/css/bootstrap.min.css";
const MODEL_URL = "/models";
const ImgList = "/img";
var labeledFaceDescriptors;
var counter = 0;
var max = 0;
var FinalExpression = [];
var uploadName = [];
var Average_expression = "";
var dummy = "praveen";
// var res = [];
var expression = "";
var no_of_times = 0;
var nameArray1 = [];
var expressionArray = [];
// var iotArray = [];
// var inputArray = [];
var stop = false;
var session = 0;
var result = [];
var time;
var map = new Map();
var l;
var key = [];
var value = [];
var imgback;
var imgTagback;
var detectedFace;
class Camera extends Component {
	constructor(props) {
		super(props);

		this.videoTag = React.createRef();

		this.state = {
			detection: null,
			video: null,
			disabled: false,
			detectedFace: null,
			enabled: true,
		};

		this.stop = this.stop.bind(this);
		this.start = this.start.bind(this);
		this.detect = this.detect.bind(this);
	}

	// Routing to Capturing
	OnFirst = () => {
		var AppUrl = "/#First";
		browserHistory.push(AppUrl);
		window.location.reload();
	};
	componentDidMount() {
		// fetch("/nameArray")
		// 	.then((res) => console.log(res.json()))
		// 	.then((nameArray) => console.log(nameArray));
		// handleSubmit(event){
		// 	event.preventDefault();

		// };
		axios.get("/nameArray").then((res) => {
			let nameArray2 = res.data;
			console.log(res.data);
			for (let i in nameArray2) {
				nameArray1[i] = nameArray2[i].name;
				console.log(nameArray1[i].name);
			}
			for (let i in nameArray1) {
				// nameArray1[i] = nameArray2[i].name;
				console.log(nameArray1[i]);
			}
		});

		axios.get("/image").then((res) => {
			let base64 = res.data;
			// console.log("from image" + res.data);
			imgback = <img src={`data:image/jpeg;base64,${res.data}`} />;
		});

		// getting access to webcam
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then(
				(stream) => (this.videoTag.current.srcObject = stream),
				this.loadModels()
			)
			.catch(console.log);
	}

	//Load the Required Model
	loadModels() {
		// faceapi.loadFaceDetectionModel(MODEL_URL);
		faceapi.loadSsdMobilenetv1Model(MODEL_URL);
		faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
		faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
		faceapi.loadFaceLandmarkModel(MODEL_URL);
		faceapi.loadFaceRecognitionModel(MODEL_URL);
	}

	detect = async () => {
		const videoTag = document.getElementById("videoTag");
		const canvas = document.getElementById("myCanvas");
		const displaySize = { width: videoTag.width, height: videoTag.height };
		faceapi.matchDimensions(canvas, displaySize);
		//setInterval starts here for continuous detection
		time = setInterval(async () => {
			let fullFaceDescriptions = await faceapi
				.detectAllFaces(videoTag)
				.withFaceLandmarks()
				.withFaceExpressions()
				.withFaceDescriptors();

			const value = fullFaceDescriptions.length;
			this.setState({ detection: value });
			fullFaceDescriptions = faceapi.resizeResults(
				fullFaceDescriptions,
				displaySize
			);
			canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
			//Label Images
			var dummy = ["praveen", "vikranth", "Gokul", "Rahul"];
			const labels = nameArray1;
			// const labels = ["praveen", "vikranth", "Gokul", "Rahul"];
			if (no_of_times <= 0) {
				if (no_of_times === 0) {
					labeledFaceDescriptors = await Promise.all(
						labels.map(async (label) => {
							// fetch image data from urls and convert blob to HTMLImage element
							const imgUrl = `/img/${label}.png`;
							// const imgUrl = `${ImgList}/${label}.png}`;
							// const imgUrl = `{process.env.PUBLIC_URL} + /img/${label}.png}`;
							// {process.env.PUBLIC_URL + '/yourPathHere.jpg'}
							const img = await faceapi.fetchImage(imgUrl);
							const fullFaceDescription = await faceapi
								.detectSingleFace(img)
								.withFaceLandmarks()
								.withFaceExpressions()
								.withFaceDescriptor();
							if (!fullFaceDescription) {
								throw new Error(`no faces detected for ${label}`);
							}

							const faceDescriptors = [fullFaceDescription.descriptor];
							return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
						})
					);
					// console.log(no_of_times);
				}
			}

			const maxDescriptorDistance = 0.7;
			no_of_times++;
			const faceMatcher = new faceapi.FaceMatcher(
				labeledFaceDescriptors,
				maxDescriptorDistance
			);

			const results = fullFaceDescriptions.map((fd) =>
				faceMatcher.findBestMatch(fd.descriptor)
			);
			result = [];
			results.forEach((bestMatch, i) => {
				const box = fullFaceDescriptions[i].detection.box;
				// console.log(box)
				const text = bestMatch.toString(); //this for basMatch name detection
				var str = "";
				//This is for removing names confidence to map value without duplicate
				var val = text.replace(/[0-9]/g, "");
				for (let i of val) {
					if (i !== " ") {
						str += i;
					} else {
						break;
					}
				}
				if (result.includes(str) === false) result.push(str);

				const drawBox = new faceapi.draw.DrawBox(box, { label: text });

				drawBox.draw(canvas);
				faceapi.draw.drawFaceExpressions(canvas, fullFaceDescriptions, 0.85);
			});

			for (let i = 0; i < fullFaceDescriptions.length; i++) {
				const result1 = fullFaceDescriptions[i].expressions.asSortedArray()[i];
				// console.log(result[i]);
				// console.log(result1.expression);
				this.test(result[i], result1.expression);
			}
		}, 100);

		// array3 = [];
		this.setState({ disabled: true });
		this.setState({ enabled: false });
		this.setState({ color: "green" });
	};

	//This function is for the Mapping of names and expression
	test = (Name, Expression) => {
		if (map.has(Name)) {
			// console.log(Name);
			var append = map.get(Name);
			map.set(Name, (append += `,${Expression}`));
		} else if (Name !== undefined) {
			map.set(Name, Expression);
			// console.log(Name);
		}
	};

	//Stop the the detection
	stop() {
		stop = true;
		session = 1;

		clearInterval(time);
		this.setState({ disabled: false });
		this.setState({ enabled: true });
		// this.setState({ enabled: false });
		this.setState({ color: "green" });
	}

	//Starts the detection here
	start() {
		l = 0;
		key = [];
		value = [];
		FinalExpression = [];
		this.detect();
		// document.getElementById("sumbitted").disabled = false; this is used when the sumbit button is used********
		this.setState({ enabled: false });
		this.setState({ disabled: true });
		imgTagback = imgback;
	}
	formsubmit() {
		fetch("/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: {
					expression_Array: FinalExpression,
					names_Array: key,
					Average_expression: Average_expression,
				},
			}),
		});
		// const user = {
		// 	expression_Array: FinalExpression,
		// 	names_Array: key,
		// 	Average_expression: Average_expression
		// };
		// axios.post("http://localhost:5000", user).then((res) => {
		// 	console.log(res);
		// 	console.log(res.data);
		// });
		console.log(FinalExpression);
		console.log(key);
	}

	render() {
		// var k;

		if (stop === true && session === 1) {
			//This is for the adding the mapped key and values to the respected key and value array
			map.forEach((values, keys) => {
				console.log(`values: ${values} and keys: ${keys}`);
				key.push(keys);
				value.push(values);
			});
			console.log(key);
			console.log(value);

			for (let i = 0; i < value.length; i++) {
				var Array = value[i].split(",");
				console.log(
					Array + "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" + Array.length
				);
				max = 0;
				if (Array.length <= 1) {
					expression = Array[0];
				} else {
					for (let l = 0; l < Array.length; l++) {
						counter = 0;
						for (let m = 0; m < Array.length; m++) {
							if (l !== m && l !== 0) {
								if (Array[l].localeCompare(Array[m]) === 0) {
									counter++;
								}

								if (counter >= max) {
									max = counter;
									expression = Array[l];
								}
							}
						}
					}
				}
				FinalExpression.push(expression);
				console.log(expression + "final" + FinalExpression);
			}

			let Avg_max = 0;
			for (let l = 0; l < FinalExpression.length; l++) {
				counter = 0;
				for (let m = 0; m < FinalExpression.length; m++) {
					if (l !== m && l !== 0) {
						if (FinalExpression[l].localeCompare(FinalExpression[m]) === 0) {
							counter++;
						}

						if (counter >= Avg_max) {
							Avg_max = counter;
							Average_expression = FinalExpression[l];
						}
					}
				}
			}
			this.formsubmit();
			//This will assign the key and value to the {MappingComponent.js}

			l = key.map((e, i) => (
				<MappingComponent
					key={Math.random()}
					person={e}
					value={FinalExpression[i]}
					avg={Average_expression}
				/>
			));
			stop = false;
		}

		return (
			<Fragment>
				<div className="main">
					<video
						id="videoTag"
						style={{ position: "absolute", top: 0 }}
						ref={this.videoTag}
						width={500}
						height={500}
						autoPlay
					></video>
				</div>

				<div>
					<canvas
						id="myCanvas"
						style={{ position: "absolute", top: 0 }}
						height={500}
						width={500}
					></canvas>
				</div>

				{/* ------ START and STOP button code ---- */}
				<div style={{ position: "absolute", top: "80%", left: "10%" }}>
					<button
						ref="startBtn"
						className="btn btn-success"
						id="btnStart"
						onClick={this.start}
						disabled={this.state.disabled}
						style={{
							color: "white",
							fontStyle: "bold",
						}}
					>
						Start
					</button>
					<button
						className="btn btn-danger"
						id="btnStop"
						onClick={this.stop}
						disabled={this.state.enabled}
						style={{
							marginLeft: "15px",
							color: "white",
						}}
					>
						Stop
					</button>
					<button onClick={this.OnFirst}>CaptureImage</button>
					<br />
					{/* this is the place where the l's element render */}

					{l}
					{imgTagback}
				</div>
			</Fragment>
		);
	}
}
export default Camera;
