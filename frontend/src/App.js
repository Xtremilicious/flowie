import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/index";
import Dashboard from "./components/Dashboard/index";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/:userId" component={Dashboard} />
    </Router>
  );
}

export default App;
