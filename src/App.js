import React, { Component } from "react";
import { Provider } from "react-redux";

import BovinesComponent from "./components/BovinesComponent";
import BrandsComponent from "./components/BrandsComponent";

import store from "./store";
import logo from "./logo.svg";
import "./App.css";
import TransactionsComponent from "./components/TransactionsComponent";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="align-items-center d-flex justify-content-between px-5 w-100 bg-success">
            <h1 class='mb-0'>Header</h1>
            <div className="d-flex font-weight-bold w-50 justify-content-around">
              <div>Action 0</div>
              <div>Action 1</div>
              <div>Action 2</div>
              <div>Action 3</div>
              <div>Action 4</div>
            </div>
            <div>Users</div>
          </div>
          <BrandsComponent />
          <BovinesComponent />
          <TransactionsComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
