import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import createRouter from "./router/index";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";

const dotenv = require("dotenv");
dotenv.config();

ReactDOM.render(createRouter, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
