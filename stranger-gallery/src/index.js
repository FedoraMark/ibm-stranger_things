import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactBreakpoints from "react-breakpoints";

import "./fonts/Benguiat_Bold.ttf";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const breakpoints = {
	sm: 576,
	md: 769,
	lg: 992,
	xl: 1200
};

ReactDOM.render(
	<ReactBreakpoints breakpoints={breakpoints}>
		<App />
	</ReactBreakpoints>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
