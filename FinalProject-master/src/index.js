import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router, Route, hashHistory, IndexRedirect } from "react-router";
import Camera from "./components/camera/Camera.js";
import Capture from "./components/capture/capture";
import Detail from "./components/Detail/Detail.js";
import Result from "./components/Result/Result.js";

import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Detail} />
		<Route path="Home" component={App} />
		<Route path="First" component={Capture} />
		<Route path="Second" component={Camera} />
		<Route path="Result" component={Result} />
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
