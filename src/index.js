'use strict';
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const { createStore } = require('redux');
const { Provider } = require('react-redux');

const fs = require('fs');

const inputs = {};

const init = (config) => {
  inputs.html = config.html;
  inputs.App = config.App;
  inputs.id = config.id;
  inputs.reducer = config.reducer;
};

const render = (req, res) => {
  const { App, reducer } = inputs;

  const context = {};
  const store = createStore(reducer);
  const preloadedState = store.getState();
  const stringComponent = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  if (context.url) {
    res.status = 302;
    res.redirect(context.url);
  } else {
    fs.readFile(inputs.html, 'utf8', (err, data) => {
      if (err) throw err;
      const regEx = new RegExp(`<div id="${inputs.id}"><\/div>`, 'gi');
      const document = data.replace(regEx, `<div id="${inputs.id}">${stringComponent}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`);
      res.write(document);
      res.end();
    });
  }
};

module.exports = {
  init,
  render,
};
