import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router, Route, hashHistory, IndexRedirect } from "react-router";
import Camera from "./components/Camera.js";
import Capture from "./components/capture";

import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App} />
		<Route path="First" component={Capture} />
		<Route path="Second" component={Camera} />
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
