const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');

const { StaticRouter } = require('react-router-dom');

const { createStore } = require('redux');
const { Provider } = require('react-redux');

let id = '';
let preloadedState = {};

module.exports = {
  React,
  ReactDOM,
  ReactDOMServer,
  StaticRouter,
  Provider,
  createStore,
  id,
  preloadedState,
};
