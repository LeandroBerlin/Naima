import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Add from "./Add";
import View from "./View";
import About from "./About";
import List from "./List";
import Update from "./Update";

const App = () => (
  <Router>
    <div>
      <div className="topnav">
        <div className="topnav-right">
          <NavLink exact to="/">
            About
          </NavLink>
          <NavLink to="/add/">Donation</NavLink>
          <NavLink to="/view/">View</NavLink>
          <NavLink to="/list">List</NavLink>
        </div>
      </div>
      <Route path="/" exact component={About} />
      <Route path="/add" component={Add} />
      <Route path="/view/:hash?" component={View} />
      <Route path="/update/:hash?" component={Update} />
      <Route path="/list" component={List} />
    </div>
  </Router>
);

export default App;
