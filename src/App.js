import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Nav, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';

import BovinesPage from './pages/BovinesPage';
import CropsPage from './pages/CropsPage';
import BatchesPage from './pages/BatchesPage';

import store from './store';
import './App.scss';
import ToastManager from './components/ToastManager';
import BackDrop from './components/BackDrop';
import Spinner from './components/Spinner';
import QuestionModal from './components/QuestionModal';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App' style={{ minHeight: '1100px' }}>
            <BackDrop />
            <Spinner />
            <div className='align-items-center d-flex justify-content-center justify-content-md-between px-5 w-100 bg-green text-white'>
              <h1 className='mb-0 d-none d-md-block'>Header</h1>
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
                  to='/batches'
                >
                  Batches
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
              <div className='d-none d-md-block'>Users</div>
            </div>
            <ToastManager />
            <Route exact path='/' component={BovinesPage} />
            <Route path='/batches' component={BatchesPage} />
            <Route path='/crops' component={CropsPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
