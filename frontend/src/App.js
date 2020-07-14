import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import "./App.css";

import Home from "./components/Home/index";
import Dashboard from "./components/Dashboard/index";

function App() {
  return (
    <UserProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:userId" component={Dashboard} />
      </Router>
    </UserProvider>
  );
}

export default App;
