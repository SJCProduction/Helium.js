import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const preloadedState = JSON.parse(window.__HELIUM_CONFIG__);
delete window.__HELIUM_CONFIG__;

const getStore = (reducer, middleware) => createStore(reducer, preloadedState, middleware);

const hydrate = (e, id) => {
  ReactDOM.hydrate(e, document.getElementById(id));
};

export default hydrate;
export {
  getStore,
};
