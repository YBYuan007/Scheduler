import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "index.scss";

import Application from "components/Application";
import DayListItem from 'components/DayListItem'; 

if (process.env.REACT_APP_API_BASE_URL) {
  console.log("index.js here")
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
} else {console.log("no index.js here", process.env.REACT_APP_API_BASE_URL)}

ReactDOM.render(<Application />, document.getElementById("root"));
