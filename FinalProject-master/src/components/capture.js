import React, { Component } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { browserHistory } from "react-router";
import axios from "axios";

var name = "";
const videoConstraints = {
	width: 350,
	height: 350,
	facingMode: "user"
};

export default class WebCamPicure extends Component {
	constructor() {
		super();
		this.state = {
			takingPicture: false,
			selectedFile: null
		};
		this.image = null;
		this.webcam = React.createRef();
		this.canvas = React.createRef();
		this.canvasPicWebCam = React.createRef();
		this.fileUploadHandler = this.fileUploadHandler.bind(this);
	}
	OnSecond = () => {
		var AppUrl = "/#Second";
		browserHistory.push(AppUrl);
		window.location.reload();
	};

	capture = () => {
		const imageSrc = this.webcam.current.getScreenshot();
		//console.log("Take Picture");
		this.landmarkWebCamPicture(imageSrc);
	};
	//   drawDescription = (canvas) => {
	//     faceapi.draw.drawFaceLandmarks(canvas)
	//   }
	landmarkWebCamPicture = (picture) => {
		const ctx = this.canvasPicWebCam.current.getContext("2d");
		var image = new Image();
		image.onload = async () => {
			ctx.drawImage(image, 0, 0);
			//   await this.getFullFaceDescription(this.canvasPicWebCam.current);
			await faceapi
				.detectAllFaces(this.canvasPicWebCam.current)
				.withFaceLandmarks();

			//   this.drawDescription(this.canvasPicWebCam.current);
		};
		image.src = picture;
	};
	download() {
		name = prompt("Enter the name:");
		console.log("download");
		var download = document.getElementById("download");
		download.setAttribute("download", name + ".png");
		var image = document
			.getElementById("canvas")
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		download.setAttribute("href", image);
		// filename.setAttribute("download","file"+"praveen"+".png");
		// console.log(filename)
	}
	fileSelectedHandler = (event) => {
		console.log(event.target.files[0]);
		this.setState({
			selectedFile: event.target.files[0]
		});
	};
	fileUploadHandler = () => {
		const fd = new FormData();
		fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
		fetch("http://localhost:5000/upload", {
			method: "POST",
			headers: { "Content-Type": "multipart/form-data" },
			mode: "no-cors",
			body: fd
		});

		// const fd = new FormData();
		// fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
		// // console.log("+");
		// axios
		// 	.post("http://localhost:5000/upload", fd, {
		// 		onUploadProgress: (ProgressEvent) => {
		// 			console.log(
		// 				"upload" +
		// 					Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
		// 					"%"
		// 			);
		// 		}
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 	});
	};

	render() {
		return (
			<div
				className="App"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Webcam
					audio={false}
					height={350}
					ref={this.webcam}
					screenshotFormat="image/jpeg"
					width={350}
					videoConstraints={videoConstraints}
				/>
				<img
					src="/img/cameraIcon.png"
					alt="Take Pic"
					height={100}
					onClick={this.capture}
				/>
				<canvas
					id="canvas"
					ref={this.canvasPicWebCam}
					width={350}
					height={350}
				/>
				<br />
				<a id="download">
					<button type="button" onClick={this.download}>
						Download
					</button>
				</a>
				<button onClick={this.OnSecond}>Recognization</button>
				<div class="upload">
					<input type="file" onChange={this.fileSelectedHandler} />
					<button onClick={this.fileUploadHandler}>upload</button>
				</div>
			</div>
		);
	}
}
