import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
      </React.Fragment>
    );
  }
}

export default App;
