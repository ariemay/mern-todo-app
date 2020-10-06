import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "../views/Login";

const routing = (
  <Router>
    <div>
      <Route path="/" component={Login} />
    </div>
  </Router>
);

export default routing;
