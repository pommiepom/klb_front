import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	$("#root")[0]
);
