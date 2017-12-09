const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const fs = require('fs');
const serialize = require('serialize-javascript');

const config = {};
const init = (inputs) => {
  config.html = inputs.html;
  config.App = inputs.App;
  config.reducer = inputs.reducer;
  config.id = inputs.id;
};


const serve = (req, res) => {
  const { App } = config;
  const context = {};
  const stringComponent = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  if (context.url) {
    res.status = 302;
    res.redirect(context.url);
  } else {
    fs.readFile(config.html, 'utf8', (err, data) => {
      if (err) throw err;
      const regEx = new RegExp(`<div id="${config.id}"></div>`, 'gi');
      const document = data.replace(regEx, `<div id="${config.id}">${stringComponent}</div>`);
      res.write(document);
      res.end();
    });
  }
};

const serveRedux = (req, res) => {
  const { App, reducer } = config;

  const context = {};
  const serveStore = createStore(reducer);
  const preloadedState = serveStore.getState();
  const stringComponent = ReactDOMServer.renderToString(
    <Provider store={serveStore}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );
  if (context.url) {
    res.status = 302;
    res.redirect(context.url);
  } else {
    fs.readFile(config.html, 'utf8', (err, data) => {
      if (err) throw err;
      const regEx = new RegExp(`<div id="${config.id}"></div>`, 'gi');
      const document = data.replace(regEx, `<div id="${config.id}">${stringComponent}</div><script>window.__HELIUM_CONFIG__ = ${JSON.stringify(serialize(preloadedState)).replace(/</g, '\\u003c')}</script>`);
      res.write(document);
      res.end();
    });
  }
};

module.exports = {
  init,
  serve,
  serveRedux,
};
