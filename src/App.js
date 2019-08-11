import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";

import BovinesComponent from "./components/BovinesComponent";
import CropsComponent from "./components/CropsComponent";

import store from "./store";
import "./App.css";
import Errors from "./components/Errors";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="align-items-center d-flex justify-content-between px-5 w-100 bg-success text-white">
              <h1 className="mb-0">Header</h1>
              <div className="d-flex font-weight-bold w-50 justify-content-around">
                <Link to="/">Bovines</Link>
                <Link to="/crops">Crops</Link>
              </div>
              <div>Users</div>
            </div>
            <Errors />
            <Route exact path="/" component={BovinesComponent} />
            <Route path="/crops" component={CropsComponent} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
