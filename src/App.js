import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import App2 from './App2';
import Main from './Main';

import AppReducer from './reducers';

const store = createStore(AppReducer, applyMiddleware(thunk));

const Kernel = () => (
  <div className="kernel">
    <ToastContainer autoClose={3000} />
    <Provider store={store}>
      <Main />
    </Provider>
  </div>
)
function mapStateToProps(state) {
  return {
    userApp: state.userApp
  };
}

export default Kernel;
