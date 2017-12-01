const {
  React,
  ReactDOM,
  createStore,
  preloadedState,
} = require('./global.js');
let { id } = require('./global.js');
const { config } = require('./serverSide');
const getStore = () => createStore(config.reducer, preloadedState);

const hydrate = (e, inputId) => {
  id = inputId;
  ReactDOM.hydrate(e, document.getElementById(id));
};

module.exports = {
  hydrate,
  getStore,
};
