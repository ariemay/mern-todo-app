import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
);

export default routing;
