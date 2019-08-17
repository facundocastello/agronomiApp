import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Nav, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';

import BovinesComponent from './pages/BovinesComponent';
import CropsComponent from './pages/CropsComponent';

import store from './store';
import './App.scss';
import ToastManager from './components/ToastManager';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App' style={{ minHeight: '1100px' }}>
            <div className='align-items-center d-flex justify-content-between px-5 w-100 bg-green text-white'>
              <h1 className='mb-0'>Header</h1>
              <div className='d-flex font-weight-bold w-50 justify-content-around'>
                <NavLink
                  className='text-white'
                  activeClassName='text-dodgerblue'
                  exact
                  to='/'
                >
                  Bovines
                </NavLink>
                <NavLink
                  className='text-white'
                  activeClassName='text-dodgerblue'
                  exact
                  to='/crops'
                >
                  Crops
                </NavLink>
              </div>
              <div>Users</div>
            </div>
            <ToastManager />
            <Route exact path='/' component={BovinesComponent} />
            <Route path='/crops' component={CropsComponent} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
